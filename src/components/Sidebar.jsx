import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
// const [sidebarData,setSidebarData]=useState() setSidebar data 
  useEffect(() => {
//    api call for sidebar 
    const sidebarData = [
      {
        key: "customers",
        name: "Customers",
        path: "/home/customers",
        defaultSelected: true,
        dataDomain: "customers",
        description: "Scenarios related to Customer (Accounts).",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "products",
        name: "Products",
        path: "/home/products",
        defaultSelected: false,
        dataDomain: "products",
        description: "Scenarios related to Products",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "contracts",
        name: "Contracts",
        path: "/home/contracts",
        defaultSelected: false,
        dataDomain: "contracts",
        description: "Scenarios related to Contracts",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "stock-status",
        name: "Stock Status",
        path: "/home/stock-status",
        defaultSelected: false,
        dataDomain: "stock-status",
        description: "Scenarios related to Stock Status",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "account-settings",
        name: "Account Setting",
        path: "/home/account-settings",
        defaultSelected: false,
        dataDomain: "account-settings",
        description: "Scenarios related to Account Setting",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "orders",
        name: "Orders",
        path: "/home/orders",
        defaultSelected: false,
        dataDomain: "orders",
        description: "Scenarios related to Orders",
        actions: ["left-drawer-menu-link-click", "left-drawer-menu-link-", "key-press"],
      },
      {
        key: "invoices",
        name: "Invoices",
        path: "/home/invoices",
        defaultSelected: false,
        dataDomain: "invoices",
        description: "Scenarios related to Invoices",
        actions: ["click", "key-press"],
      },
    ];

    setSidebarItems(sidebarData);

    // Redirect to defaultSelected only if on "/home"
    if (location.pathname === "/" || location.pathname === "/home") {
        const defaultItem = sidebarData.find(item => item.defaultSelected);
        if (defaultItem) {
          navigate(defaultItem.path, { replace: true });
        }
      }
  }, [location.pathname, navigate]);

  return (
    <div className={`bg-blue-300 text-white h-full transition-all duration-300 ${isOpen ? "w-64" : "w-16"} overflow-hidden`}>
      <div className="p-4 text-lg font-bold">Logo</div>
      <ul className="space-y-1 p-2">
        {sidebarItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                }`
              }
              title={item.name}
              data-domain={item.dataDomain}
            >
              {isOpen ? item.name : item.name.charAt(0)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
