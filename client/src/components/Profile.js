import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHeart,
  FaBox,
  FaBell,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaBars, // Added hamburger icon
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Order from "./Profile Page/Order"; 
import Notification from "./Profile Page/Notification";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    addresses: [],
    rewardsPoints: 150,
    orders: [],
    wishlist: [],
    notifications: [],
  });

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}user/me`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      }
    };

    fetchUser();
  }, []);

  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editedAddresses, setEditedAddresses] = useState([]);
  const [isEditingAddressIndex, setIsEditingAddressIndex] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: true,
  });

  useEffect(() => {
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }, [user]);

  // Mobile menu handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    closeMobileMenu(); // Close mobile menu when section is selected
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  };

  const handleSaveChanges = () => {
    if (editForm.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    setUser((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    }));
    const updateUser = async () => {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}user/me`,
          {
            name: editForm.name,
            phone: editForm.phone,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user");
      }
    };
    updateUser();
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: FaUser },
    { id: "addresses", label: "Address Book", icon: FaMapMarkerAlt },
    { id: "payment", label: "My Payment Options", icon: FaCreditCard },
    { id: "orders", label: "My Orders", icon: FaBox },
    { id: "returns", label: "My Returns", icon: FaBox },
    { id: "wishlist", label: "My Wishlist", icon: FaHeart },
    { id: "notifications", label: "Notifications", icon: FaBell },
  ];

  // For address section
  const handleAddressInputChange = (index, field, value) => {
    setEditedAddresses((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleEditAddress = (index) => {
    setIsEditingAddressIndex(index);
    const copy = [...editedAddresses];
    copy[index] = { ...user.addresses[index] };
    setEditedAddresses(copy);
  };

  const handleCancelEditAddress = () => {
    setIsEditingAddressIndex(null);
  };

  const handleSaveAddress = async (index) => {
    try {
      const updatedAddress = editedAddresses[index];
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}user/me`,
        {addresses:[updatedAddress]},
        { withCredentials: true }
      );
      toast.success("Address updated successfully");
      setUser((prev) => {
        const updated = [...prev.addresses];
        updated[index] = updatedAddress;
        return { ...prev, addresses: updated };
      });

      setIsEditingAddressIndex(null);
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    }
  };

  // New address functions
  const handleNewAddressInputChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNewAddress = () => {
    setIsAddingNewAddress(true);
  };

  const handleCancelNewAddress = () => {
    setIsAddingNewAddress(false);
    setNewAddress({
      fullName: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: true,
    });
  };

  const handleSaveNewAddress = async () => {
    // Validate required fields
    if (!newAddress.fullName || !newAddress.street || !newAddress.city || 
        !newAddress.state || !newAddress.pincode || !newAddress.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (newAddress.pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    if (newAddress.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}user/me`,
        { addresses: [newAddress] },
        { withCredentials: true }
      );
      
      toast.success("Address added successfully");
      setUser((prev) => ({
        ...prev,
        addresses: [...prev.addresses, newAddress],
      }));

      handleCancelNewAddress();
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    }
  };

  // Sidebar component with sticky positioning
  const Sidebar = ({ isMobile = false }) => (
    <div className={`bg-gray-50 rounded-lg shadow-sm p-6 ${
      isMobile 
        ? 'h-full' 
        : 'sticky top-32 h-fit max-h-[calc(100vh-10rem)] overflow-y-auto'
    }`}>
      <h2 className="font-semibold text-gray-900 mb-4">
        Manage My Account
      </h2>
      <nav className="space-y-2">
        {menuItems.slice(0, 3).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-red-50 text-red-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <h3 className="font-semibold text-gray-900 mt-6 mb-4">
        Order
      </h3>
      <nav className="space-y-2">
        {menuItems.slice(3, 5).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-red-50 text-red-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <h3 className="font-semibold text-gray-900 mt-6 mb-4">
        My Notifications
      </h3>
      <button
        onClick={() => {
          handleSectionChange("wishlist")
          if (isMobile) closeMobileMenu();
        }}
        className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md transition-colors ${
          activeSection === "wishlist"
            ? "bg-red-50 text-red-500"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <FaBell size={16} />
        Notifications
      </button>
    </div>
  );

  const renderProfileSection = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-red-500">
          Edit Your Profile
        </h2>
        <button
          onClick={handleEditToggle}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
        >
          {isEditing ? <FaTimes size={16} /> : <FaEdit size={16} />}
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={
              isEditing
                ? editForm.name?.split(" ")[0] ?? ""
                : user.name?.split(" ")[0] ?? ""
            }
            onChange={(e) => {
              if (isEditing) {
                const lastName =
                  editForm.name?.split(" ")?.slice(1)?.join(" ") ?? "";
                handleInputChange(
                  "name",
                  `${e.target.value} ${lastName}`.trim()
                );
              }
            }}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              !isEditing ? "bg-gray-50 text-gray-500" : "bg-white"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={
              isEditing
                ? editForm.name?.split(" ")?.slice(1)?.join(" ") ?? ""
                : user.name?.split(" ")?.slice(1)?.join(" ") ?? ""
            }
            onChange={(e) => {
              if (isEditing) {
                const firstName = editForm.name?.split(" ")?.[0] ?? "";
                handleInputChange(
                  "name",
                  `${firstName} ${e.target.value}`.trim()
                );
              }
            }}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              !isEditing ? "bg-gray-50 text-gray-500" : "bg-white"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled={true}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={isEditing ? editForm.phone : user.phone}
            onChange={(e) =>
              isEditing && handleInputChange("phone", e.target.value)
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              !isEditing ? "bg-gray-50 text-gray-500" : "bg-white"
            }`}
          />
        </div>

        {user.addresses?.length > 0 && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={`${user.addresses[0].city}, ${user.addresses[0].pincode}, ${user.addresses[0].state}`}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
            />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleEditToggle}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <FaSave size={16} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );

  const renderAddressSection = () => (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Address Book</h2>
      
      {user.addresses.length === 0 ? (
        // Show only "Add New Address" when no addresses exist
        <div className="text-center py-12">
          {!isAddingNewAddress ? (
            <div 
              onClick={handleAddNewAddress}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:border-red-500 hover:text-red-500 cursor-pointer transition-colors mx-auto max-w-md"
            >
              <FaPlus size={24} className="mb-2" />
              <span>Add Your First Address</span>
            </div>
          ) : (
            // New address form
            <div className="max-w-md mx-auto border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Add New Address</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAddress.fullName}
                  onChange={(e) => handleNewAddressInputChange("fullName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={newAddress.street}
                  onChange={(e) => handleNewAddressInputChange("street", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => handleNewAddressInputChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => handleNewAddressInputChange("state", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => handleNewAddressInputChange("pincode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) => handleNewAddressInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSaveNewAddress}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Save Address
                </button>
                <button
                  onClick={handleCancelNewAddress}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Show existing addresses when addresses exist
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {user.addresses.map((address, index) => {
            const isEditing = isEditingAddressIndex === index;
            const data = isEditing ? editedAddresses[index] : address;

            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) =>
                        handleAddressInputChange(index, "fullName", e.target.value)
                      }
                      className="text-sm font-medium text-gray-800 w-full border-b"
                    />
                  ) : (
                    <h3 className="font-medium text-gray-900">{address.fullName}</h3>
                  )}

                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>

                <div className="text-gray-600 text-sm space-y-1">
                  {["street", "city", "state", "pincode", "phone"].map((field) => (
                    <div key={field}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data[field]}
                          onChange={(e) =>
                            handleAddressInputChange(index, field, e.target.value)
                          }
                          className="w-full border-b"
                        />
                      ) : (
                        <p>
                          {field === "pincode"
                            ? `Pincode: ${address[field]}`
                            : field === "phone"
                            ? `Phone: ${address[field]}`
                            : address[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSaveAddress(index)}
                        className="text-green-600 text-sm hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEditAddress}
                        className="text-gray-500 text-sm hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditAddress(index)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Edit
                      </button>
                      <button className="text-gray-500 text-sm hover:underline">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "addresses":
        return renderAddressSection();
      case "payment":
        return (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Payment Options
            </h2>
            <div className="text-center py-12 text-gray-500">
              <FaCreditCard size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Coming Soon!</h3>
              <p>Payment options feature will be available soon.</p>
              <p className="text-sm mt-2">You'll be able to manage your saved cards and payment methods here.</p>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="bg-white rounded-lg">
            <Order filter="all" />
          </div>
        );
      case "returns":
        return (
          <div className="bg-white rounded-lg">
            <Order filter="cancelled" />
          </div>
        );
        case "wishlist":
        return (
          <div className="bg-white rounded-lg">
            <Notification />
          </div>
        );  
      default:
        return (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {menuItems.find((item) => item.id === activeSection)?.label}
            </h2>
            <div className="text-center py-12 text-gray-500">
              <p>Content for {activeSection} section</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
      <div className="w-full sm:w-[90%] md:w-[95%] mx-auto  pt-10">
        <div className="min-h-screen -mx-4 sm:-mx-6 px-4 sm:px-6">
          {/* Header */}
          <div className="bg-gray-50 shadow-sm border-b mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">Home</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900">My Account</span>
                </div>
                <div className="text-xs text-gray-600">
                  Welcome!{" "}
                  <span className="text-red-500 font-medium">{user.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-3">
              <button
                onClick={toggleMobileMenu}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                <FaBars size={14} />
                Menu
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Desktop Sidebar - Now with sticky positioning */}
              <div className="hidden lg:block lg:w-1/4">
                <Sidebar />
              </div>

              {/* Mobile Sidebar Overlay */}
              {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={closeMobileMenu}
                  ></div>
                  
                  {/* Sidebar */}
                  <div className="fixed left-0 top-0 h-full w-80 max-w-[80vw] bg-white shadow-lg overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                      <button
                        onClick={closeMobileMenu}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>
                    <div className="p-4">
                      <Sidebar isMobile={true} />
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content - Now with proper scrolling */}
              <div className="w-full lg:w-3/4 lg:min-h-0">{renderSection()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;