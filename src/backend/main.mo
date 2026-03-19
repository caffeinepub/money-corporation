import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  type ProductCategory = { #account; #loan };
  type ApplicationStatus = { #pending; #approved; #rejected };

  public type Product = {
    name : Text;
    category : ProductCategory;
    interestRate : Float;
    minAmount : Float;
    maxAmount : Float;
    features : [Text];
  };

  type Application = {
    id : Nat;
    applicant : Principal;
    name : Text;
    email : Text;
    phone : Text;
    productName : Text;
    productCategory : ProductCategory;
    requestedAmount : ?Float;
    status : ApplicationStatus;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  // Storage
  var nextApplicationId = 0;
  let products = Map.empty<Text, Product>();
  let applications = Map.empty<Nat, Application>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management (Admin Only)
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.name, product);
  };

  public shared ({ caller }) func editProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can edit products");
    };
    if (not products.containsKey(product.name)) {
      Runtime.trap("Product does not exist");
    };
    products.add(product.name, product);
  };

  // Public Product Queries
  public query ({ caller }) func getProduct(name : Text) : async ?Product {
    products.get(name);
  };

  public query ({ caller }) func listProducts() : async [Product] {
    products.values().toArray();
  };

  // Product Applications
  public shared ({ caller }) func submitApplication(
    name : Text,
    email : Text,
    phone : Text,
    productName : Text,
    requestedAmount : ?Float
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit applications");
    };

    let product = switch (products.get(productName)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };

    let application : Application = {
      id = nextApplicationId;
      applicant = caller;
      name;
      email;
      phone;
      productName;
      productCategory = product.category;
      requestedAmount;
      status = #pending;
      timestamp = Time.now();
    };

    applications.add(nextApplicationId, application);
    nextApplicationId += 1;
    application.id;
  };

  // Application Queries
  public query ({ caller }) func getApplication(id : Nat) : async Application {
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        if (not AccessControl.isAdmin(accessControlState, caller) and application.applicant != caller) {
          Runtime.trap("Unauthorized: Can only view your own applications");
        };
        application;
      };
    };
  };

  public query ({ caller }) func listMyApplications() : async [Application] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view applications");
    };

    let myApps = List.empty<Application>();
    applications.values().forEach(
      func(app) {
        if (app.applicant == caller) {
          myApps.add(app);
        };
      }
    );
    myApps.toArray();
  };

  public query ({ caller }) func listAllApplications() : async [Application] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all applications");
    };
    applications.values().toArray();
  };

  // Application Status Updates (Admin Only)
  public shared ({ caller }) func updateApplicationStatus(id : Nat, newStatus : ApplicationStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update application status");
    };

    let application = switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) { app };
    };

    if (application.status != #pending) {
      Runtime.trap("Cannot update status - application is not pending");
    };

    let updatedApp : Application = {
      id = application.id;
      applicant = application.applicant;
      name = application.name;
      email = application.email;
      phone = application.phone;
      productName = application.productName;
      productCategory = application.productCategory;
      requestedAmount = application.requestedAmount;
      status = newStatus;
      timestamp = application.timestamp;
    };

    applications.add(id, updatedApp);
  };
};
