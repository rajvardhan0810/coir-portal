"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ApplicationFooter } from "@/components/applicant/applications/layout/ApplicationFooter";
import * as showroomService from "@/services/showroom.service";

type SupplierRow = {
  id: string;
  name: string;
  rating: number;
  stars: number;
  availability: "IN STOCK" | "LIMITED" | "OUT OF STOCK";
  stock: number;
  fulfillment: string;
  base: number;
  trans: number;
  tax: number;
  total: number;
};

const initialSuppliers: SupplierRow[] = [
  {
    id: "sup-1",
    name: "Kerala Coir Crafts",
    rating: 4.8,
    stars: 5,
    availability: "IN STOCK",
    stock: 3200,
    fulfillment: "12 Days",
    base: 150,
    trans: 15,
    tax: 20,
    total: 185,
  },
  {
    id: "sup-2",
    name: "Alleppey Weaves",
    rating: 4.2,
    stars: 4,
    availability: "IN STOCK",
    stock: 1850,
    fulfillment: "18 Days",
    base: 145,
    trans: 10,
    tax: 17,
    total: 172,
  },
  {
    id: "sup-3",
    name: "Malabar Co-op",
    rating: 3.5,
    stars: 3,
    availability: "LIMITED",
    stock: 400,
    fulfillment: "25 Days",
    base: 145,
    trans: 10,
    tax: 17,
    total: 172,
  },
  {
    id: "sup-4",
    name: "Southern Fibre Exporters",
    rating: 2.5,
    stars: 3,
    availability: "LIMITED",
    stock: 100,
    fulfillment: "28 Days",
    base: 420,
    trans: 45,
    tax: 55,
    total: 520,
  },
  {
    id: "sup-5",
    name: "Malabar Weaves Ltd",
    rating: 2.0,
    stars: 2,
    availability: "LIMITED",
    stock: 50,
    fulfillment: "30 Days",
    base: 380,
    trans: 90,
    tax: 45,
    total: 515,
  },
];

type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  stockStatus: "AVAILABLE" | "LOW STOCK" | "OUT OF STOCK";
  supplier: string;
  image: string;
};

const initialInventory: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Premium Door Mat",
    sku: "COIR-MAT-001",
    category: "Mats & Rugs",
    quantity: 142,
    unit: "units",
    unitPrice: 450,
    stockStatus: "AVAILABLE",
    supplier: "Kerala Coir Crafts",
    image: "/assets/images/coir_door_mat.png",
  },
  {
    id: "inv-2",
    name: "Raw Brown Fiber",
    sku: "COIR-FIB-042",
    category: "Coir Fiber",
    quantity: 28,
    unit: "kg",
    unitPrice: 85,
    stockStatus: "LOW STOCK",
    supplier: "Alleppey Weaves",
    image: "/assets/images/coir_fiber.png",
  },
  {
    id: "inv-3",
    name: "3-Ply Coir Rope",
    sku: "COIR-ROP-081",
    category: "Coir Rope",
    quantity: 0,
    unit: "units",
    unitPrice: 120,
    stockStatus: "OUT OF STOCK",
    supplier: "Malabar Co-op",
    image: "/assets/images/coir_rope.png",
  },
  {
    id: "inv-4",
    name: "Erosion Control Mesh",
    sku: "COIR-GEO-210",
    category: "Geotextiles",
    quantity: 50,
    unit: "rolls",
    unitPrice: 2850,
    stockStatus: "AVAILABLE",
    supplier: "Southern Fibre Exporters",
    image: "/assets/images/coir_geotextile_mesh.png",
  },
  {
    id: "inv-5",
    name: "Rubberized Coir Pad",
    sku: "COIR-PAD-105",
    category: "Rubberized Mattresses",
    quantity: 600,
    unit: "units",
    unitPrice: 350,
    stockStatus: "AVAILABLE",
    supplier: "Malabar Weaves Ltd",
    image: "/assets/images/coir_fiber.png",
  },
  {
    id: "inv-6",
    name: "Curled Coir",
    sku: "COIR-FIB-012",
    category: "Coir Fiber",
    quantity: 110,
    unit: "kg",
    unitPrice: 84,
    stockStatus: "LOW STOCK",
    supplier: "Kerala Coir Crafts",
    image: "/assets/images/coir_rope.png",
  },
];

export default function ShowroomDashboardPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<SupplierRow[]>(initialSuppliers);
  const [selectedSupplierIds, setSelectedSupplierIds] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  type DemandItem = {
    id: string;
    category: string;
    productName: string;
    dateText: string;
    qty: string;
    status: "RESPONDED" | "SUBMITTED" | "ORDER RAISED" | "ORDER PLACED";
  };

  const initialDemands: DemandItem[] = [
    {
      id: "DEM-2026-089",
      category: "Coir Geo-textile",
      productName: "Coir Geo-textile",
      dateText: "Raised 31 Mar, 2026",
      qty: "5,000 m²",
      status: "RESPONDED",
    },
    {
      id: "DEM-2026-091",
      category: "Premium Coir Pith",
      productName: "Premium Coir Pith",
      dateText: "Raised 30 Mar, 2026",
      qty: "250 Units",
      status: "SUBMITTED",
    },
    {
      id: "DEM-2026-078",
      category: "Rubberized Mattresses",
      productName: "Rubberized Mattress",
      dateText: "Raised 20 Mar, 2026",
      qty: "1,200 Units",
      status: "ORDER RAISED",
    },
    {
      id: "DEM-2026-095",
      category: "Curled Coir Rope",
      productName: "Marine Grade Coir Rope",
      dateText: "Raised 11 Mar, 2026",
      qty: "10 Tons",
      status: "SUBMITTED",
    },
  ];

  // Demand states
  const [demands, setDemands] = useState<DemandItem[]>([]);
  const [demandSearch, setDemandSearch] = useState("");
  const [activeDemandId, setActiveDemandId] = useState("DEM-2026-089");

  // Popup overlay states
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const currentDashboardDemand = demands.find((d) => d.id === activeDemandId) || demands[0];

  // Order Allocation view toggle state
  const [isAllocatingOrder, setIsAllocatingOrder] = useState(false);

  // Placed Orders and popup states
  const [placedOrders, setPlacedOrders] = useState<any[]>([]);
  const [showOrderConfirmPopup, setShowOrderConfirmPopup] = useState(false);
  const [showOrderSuccessPopup, setShowOrderSuccessPopup] = useState(false);
  const [selectedPlacedOrder, setSelectedPlacedOrder] = useState<any | null>(null);

  // Add Supplier directory states
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState("");

  const [newSupName, setNewSupName] = useState("");
  const [newSupRating, setNewSupRating] = useState("4.0");
  const [newSupAvailability, setNewSupAvailability] = useState<"IN STOCK" | "LIMITED" | "OUT OF STOCK">("IN STOCK");
  const [newSupStock, setNewSupStock] = useState("1000");
  const [newSupFulfillment, setNewSupFulfillment] = useState("15 Days");
  const [newSupBase, setNewSupBase] = useState("150");
  const [newSupTrans, setNewSupTrans] = useState("15");
  const [newSupTax, setNewSupTax] = useState("20");

  const refreshAllData = async () => {
    try {
      const invData = await showroomService.getInventory();
      setInventory(invData.map((item: any) => ({
        ...item,
        unitPrice: parseFloat(item.unitPrice)
      })));

      const supsData = await showroomService.getSuppliers();
      setSuppliers(supsData.map((sup: any) => ({
        ...sup,
        base: parseFloat(sup.base),
        trans: parseFloat(sup.trans),
        tax: parseFloat(sup.tax),
        total: parseFloat(sup.total)
      })));

      const demandsData = await showroomService.getDemands();
      const formattedDemands = demandsData.map((d: any) => ({
        id: d.id,
        category: d.category,
        productName: d.productName,
        dateText: d.dateText,
        qty: d.qty,
        status: d.status as any,
      }));
      setDemands(formattedDemands);

      const orders = demandsData
        .filter((d: any) => d.status === "ORDER PLACED")
        .map((d: any) => {
          const ord = d.orders[0];
          if (!ord) return null;
          return {
            demandId: d.id,
            category: d.category,
            productName: d.productName,
            orderDate: ord.orderDate,
            totalQty: ord.totalQty,
            allocations: ord.allocations.map((alloc: any) => ({
              supplierId: alloc.supplierId,
              supplierName: alloc.supplierName,
              rating: alloc.rating,
              stars: alloc.stars,
              allocatedQty: alloc.allocatedQty,
              fulfillment: alloc.fulfillment,
              priceBreakup: {
                base: parseFloat(alloc.base),
                trans: parseFloat(alloc.trans),
                tax: parseFloat(alloc.tax),
                total: parseFloat(alloc.total)
              }
            }))
          };
        })
        .filter(Boolean);
      setPlacedOrders(orders);
    } catch (error) {
      console.error("Failed to load database showroom data", error);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupName) return;

    const ratingVal = parseFloat(newSupRating) || 4.0;
    const baseVal = parseInt(newSupBase) || 0;
    const transVal = parseInt(newSupTrans) || 0;
    const taxVal = parseInt(newSupTax) || 0;

    try {
      await showroomService.createSupplier({
        name: newSupName,
        rating: ratingVal,
        availability: newSupAvailability,
        stock: parseInt(newSupStock) || 0,
        fulfillment: newSupFulfillment,
        base: baseVal,
        trans: transVal,
        tax: taxVal,
      });

      setIsAddSupplierModalOpen(false);
      await refreshAllData();

      setNewSupName("");
      setNewSupRating("4.0");
      setNewSupAvailability("IN STOCK");
      setNewSupStock("1000");
      setNewSupFulfillment("15 Days");
      setNewSupBase("150");
      setNewSupTrans("15");
      setNewSupTax("20");
    } catch (err) {
      console.error(err);
      alert("Failed to add supplier.");
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    if (confirm("Are you sure you want to remove this supplier?")) {
      try {
        await showroomService.deleteSupplier(id);
        await refreshAllData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete supplier.");
      }
    }
  };

  const confirmOrderSubmission = async () => {
    if (!currentDashboardDemand) return;

    const allocations = suppliers
      .filter((s) => selectedSupplierIds.includes(s.id))
      .map((s) => {
        const pricing = getSupplierPriceForDemand(s, currentDashboardDemand);
        return {
          supplierId: s.id,
          supplierName: s.name,
          rating: s.rating,
          stars: s.stars,
          allocatedQty: String(s.stock),
          fulfillment: s.fulfillment,
          priceBreakup: pricing,
        };
      });

    try {
      await showroomService.placeOrder(currentDashboardDemand.id, {
        category: currentDashboardDemand.category,
        productName: currentDashboardDemand.productName,
        orderDate: "11/04/2026",
        totalQty: currentDashboardDemand.qty,
        allocations: allocations
      });

      setShowOrderConfirmPopup(false);
      setShowOrderSuccessPopup(true);
      await refreshAllData();
    } catch (e) {
      console.error(e);
      alert("Failed to submit order allocation.");
    }
  };

  const getSupplierPriceForDemand = (supplier: SupplierRow, demand: any) => {
    // Determine a target price based on demand category
    let targetPrice = 450;
    const cat = (demand?.category || "").toLowerCase();
    if (cat.includes("geo") || cat.includes("mesh") || cat.includes("textile")) {
      targetPrice = 2850;
    } else if (cat.includes("pith") || cat.includes("peat")) {
      targetPrice = 120;
    } else if (cat.includes("mattress")) {
      targetPrice = 3500;
    } else if (cat.includes("rope")) {
      targetPrice = 84;
    }

    // Distribute base, trans, tax dynamically based on supplier index
    const factor =
      supplier.id === "sup-1"
        ? 0.95
        : supplier.id === "sup-2"
        ? 1.02
        : supplier.id === "sup-3"
        ? 0.98
        : supplier.id === "sup-4"
        ? 1.05
        : 0.97;

    const total = Math.round(targetPrice * factor);
    const trans = Math.round(total * 0.08);
    const tax = Math.round(total * 0.12);
    const base = total - trans - tax;

    return { base, trans, tax, total };
  };

  // Raise Demand form states
  const [demandCategory, setDemandCategory] = useState("Mats & Rugs");
  const [demandProductName, setDemandProductName] = useState("Premium Door Mat");
  const [demandQty, setDemandQty] = useState("");
  const [demandQtyType, setDemandQtyType] = useState("Square Meter (m²)");
  const [demandDate, setDemandDate] = useState("");
  const [demandSpec, setDemandSpec] = useState("");
  const [demandRemarks, setDemandRemarks] = useState("");
  const [demandPin, setDemandPin] = useState("");

  // Sync category selection to first product name and appropriate qty unit
  useEffect(() => {
    if (demandCategory === "Mats & Rugs") {
      setDemandProductName("Premium Door Mat");
      setDemandQtyType("Units");
    } else if (demandCategory === "Premium Coir Pith") {
      setDemandProductName("Coir Pith Compost Block");
      setDemandQtyType("Units");
    } else if (demandCategory === "Rubberized Mattresses") {
      setDemandProductName("Rubberized Coir Mattress");
      setDemandQtyType("Units");
    } else if (demandCategory === "Curled Coir Rope") {
      setDemandProductName("Marine Grade Coir Rope");
      setDemandQtyType("Tons");
    } else if (demandCategory === "Geotextiles") {
      setDemandProductName("Erosion Control Mesh");
      setDemandQtyType("Square Meter (m²)");
    }
  }, [demandCategory]);

  const handleRaiseDemandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demandQty || !demandDate || !demandPin) {
      alert("Please fill in all required fields (Quantity, Expected Delivery Date, and Delivery Pin Code).");
      return;
    }
    setShowConfirmPopup(true);
  };

  const confirmSubmission = async () => {
    const newIdText = `DEM-2026-0${96 + demands.length}`;

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
    const raisedOnStr = `Raised ${today.toLocaleDateString("en-US", options)}`;

    const newDemand = {
      id: newIdText,
      category: demandCategory,
      productName: demandProductName,
      dateText: raisedOnStr,
      qty: `${Number(demandQty).toLocaleString()} ${
        demandQtyType === "Square Meter (m²)"
          ? "m²"
          : demandQtyType === "Units"
          ? "Units"
          : demandQtyType === "Tons"
          ? "Tons"
          : "kg"
      }`,
      status: "SUBMITTED",
    };

    try {
      await showroomService.createDemand(newDemand);
      setActiveDemandId(newIdText);
      setShowConfirmPopup(false);
      setShowSuccessPopup(true);
      await refreshAllData();

      // Reset Form
      setDemandQty("");
      setDemandDate("");
      setDemandSpec("");
      setDemandRemarks("");
      setDemandPin("");
    } catch (e) {
      console.error(e);
      alert("Failed to raise demand.");
    }
  };

  // Inventory states
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState("All");
  const [filterSupplier, setFilterSupplier] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryPage, setInventoryPage] = useState(1);
  const itemsPerPage = 4;

  // Add Inventory form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemSku, setNewItemSku] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Mats & Rugs");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("units");
  const [newItemUnitPrice, setNewItemUnitPrice] = useState("");
  const [newItemSupplier, setNewItemSupplier] = useState("Kerala Coir Crafts");

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemSku || !newItemQuantity || !newItemUnitPrice) {
      alert("Please fill in all fields.");
      return;
    }

    const qty = Number(newItemQuantity);
    const price = Number(newItemUnitPrice);

    if (isNaN(qty) || qty < 0) {
      alert("Quantity must be a non-negative number.");
      return;
    }
    if (isNaN(price) || price < 0) {
      alert("Unit price must be a non-negative number.");
      return;
    }

    let status: "AVAILABLE" | "LOW STOCK" | "OUT OF STOCK" = "AVAILABLE";
    if (qty === 0) {
      status = "OUT OF STOCK";
    } else if (qty < 30) {
      status = "LOW STOCK";
    }

    let img = "/assets/images/coir_fiber.png";
    if (newItemCategory === "Mats & Rugs") {
      img = "/assets/images/coir_door_mat.png";
    } else if (newItemCategory === "Coir Rope") {
      img = "/assets/images/coir_rope.png";
    } else if (newItemCategory === "Geotextiles") {
      img = "/assets/images/coir_geotextile_mesh.png";
    }

    try {
      await showroomService.createInventoryItem({
        name: newItemName,
        sku: newItemSku.toUpperCase(),
        category: newItemCategory,
        quantity: qty,
        unit: newItemUnit,
        unitPrice: price,
        stockStatus: status,
        supplier: newItemSupplier,
        image: img,
      });

      setIsAddModalOpen(false);
      setInventoryPage(1);
      await refreshAllData();

      // Reset Form
      setNewItemName("");
      setNewItemSku("");
      setNewItemCategory("Mats & Rugs");
      setNewItemQuantity("");
      setNewItemUnit("units");
      setNewItemUnitPrice("");
      setNewItemSupplier("Kerala Coir Crafts");
    } catch (e) {
      console.error(e);
      alert("Failed to add inventory item.");
    }
  };

  // Selection toggles
  const toggleSelect = (id: string) => {
    setSelectedSupplierIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSupplierIds.length === suppliers.length) {
      setSelectedSupplierIds([]);
    } else {
      setSelectedSupplierIds(suppliers.map((s) => s.id));
    }
  };

  const handlePlaceOrder = () => {
    if (selectedSupplierIds.length === 0) {
      alert("Please select at least one supplier to place an order.");
      return;
    }
    setIsAllocatingOrder(true);
  };

  const handleLogout = () => {
    router.push("/business-login");
  };

  return (
    <main className="showroom-dashboard-container">
      {/* CSS matching the screenshots exactly */}
      <style jsx global>{`
        body {
          background-color: #f7f3eb !important;
          margin: 0;
          font-family: "Livvic", Arial, Helvetica, sans-serif;
        }
        .showroom-dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f7f3eb;
        }

        /* Sidebar Styling */
        .showroom-sidebar {
          width: 260px;
          background-color: #faf7f2;
          border-right: 1px solid #e7dfd3;
          display: flex;
          flex-direction: column;
          padding: 28px 16px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .showroom-sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          padding-bottom: 12px;
        }
        .showroom-logo-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px double #b88f51;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .showroom-logo-inner {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b88f51, #7c5822);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 900;
          font-size: 11px;
          text-align: center;
          line-height: 1.1;
        }
        .showroom-sidebar-title h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 900;
          color: #4b2822;
          line-height: 1.2;
        }
        .showroom-sidebar-title p {
          margin: 1px 0 0;
          font-size: 8px;
          font-weight: 800;
          color: #8b642b;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .showroom-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }
        .showroom-menu-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          border: none;
          background: none;
          color: #555555;
          font-size: 15px;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .showroom-menu-item:hover {
          background-color: rgba(184, 143, 81, 0.08);
          color: #8b642b;
        }
        .showroom-menu-item.active {
          background-color: #ffffff;
          color: #8b642b;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .showroom-menu-item i {
          font-size: 18px;
          color: #8b642b;
        }

        /* Main Section */
        .showroom-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          background-color: #f7f3eb;
        }
        .showroom-topbar {
          height: 72px;
          background-color: #ffffff;
          border-bottom: 1px solid #e7dfd3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }
        .showroom-topbar-title {
          font-size: 18px;
          font-weight: 800;
          color: #8b642b;
        }
        .showroom-topbar-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .topbar-icon-btn {
          background: none;
          border: none;
          font-size: 22px;
          color: #555555;
          cursor: pointer;
          position: relative;
        }
        .notification-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 7px;
          height: 7px;
          background: #e53e3e;
          border-radius: 50%;
        }

        /* Content panel */
        .showroom-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .showroom-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .showroom-page-meta p {
          margin: 0;
          font-size: 11px;
          font-weight: 800;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .showroom-page-meta h1 {
          margin: 4px 0 0;
          font-size: 32px;
          font-weight: 900;
          color: #4b2822;
        }
        .showroom-header-btns {
          display: flex;
          gap: 14px;
        }
        .btn-outline-gold {
          background: #ffffff;
          border: 1px solid #b88f51;
          color: #b88f51;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-outline-gold:hover {
          background: #faf8f5;
        }
        .btn-solid-gold {
          background: #b88f51;
          border: none;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-solid-gold:hover {
          background: #9f753c;
        }

        /* Metrics layout */
        .metrics-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .metric-card-custom {
          background: #ffffff;
          border: 1px solid #e7dfd3;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 155px;
        }
        .metric-card-custom.gold-theme {
          background-color: #5d452f;
          border-color: #5d452f;
          color: #ffffff;
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-top-title {
          font-size: 12px;
          font-weight: 800;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .gold-theme .card-top-title {
          color: #d7c9b8;
        }
        .card-top-icon {
          color: #cbd5e0;
          font-size: 20px;
        }
        .gold-theme .card-top-icon {
          color: #d7c9b8;
        }
        .metric-card-val {
          font-size: 32px;
          font-weight: 900;
          color: #4b2822;
          margin: 12px 0 2px;
        }
        .gold-theme .metric-card-val {
          color: #ffffff;
        }
        .metric-footer {
          font-size: 13px;
          color: #38a169;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .metric-badge-green {
          background-color: #c6f6d5;
          color: #22543d;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 800;
          width: fit-content;
        }
        .compliance-sub-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .compliance-item {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
          padding-bottom: 6px;
        }
        .compliance-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .compliance-label {
          color: #d7c9b8;
          font-weight: 600;
        }
        .compliance-val {
          font-weight: 800;
          color: #ffffff;
        }

        /* Table container */
        .supplier-response-section {
          background: #ffffff;
          border: 1px solid #e7dfd3;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          overflow: hidden;
        }
        .section-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e7dfd3;
        }
        .section-header-custom h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 900;
          color: #8b642b;
        }
        .section-header-actions {
          display: flex;
          gap: 12px;
        }
        .section-header-actions button {
          background: #ffffff;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: #555555;
          font-size: 18px;
        }

        /* Beige demand info bar */
        .demand-info-strip {
          background-color: #faf7f2;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e7dfd3;
        }
        .demand-id-badge {
          font-size: 15px;
          font-weight: 800;
          color: #4b2822;
        }
        .demand-product-name {
          font-size: 15px;
          font-weight: 800;
          color: #8b642b;
          letter-spacing: 0.5px;
        }

        /* Supplier response table grid */
        .grid-table {
          width: 100%;
          border-collapse: collapse;
        }
        .grid-table th {
          background-color: #ffffff;
          color: #718096;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 16px 24px;
          text-align: left;
          border-bottom: 1px solid #e7dfd3;
        }
        .grid-table td {
          padding: 22px 24px;
          border-bottom: 1px solid #f7f3eb;
          vertical-align: middle;
          font-size: 15px;
          color: #2d3748;
        }
        .grid-table tr:last-child td {
          border-bottom: none;
        }
        .checkbox-container {
          width: 24px;
        }
        .checkbox-container input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #b88f51;
        }
        
        .supplier-name-cell {
          font-weight: 800;
          color: #4b2822;
        }
        .rating-stars {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .star-gold {
          color: #b88f51;
        }
        .star-grey {
          color: #cbd5e0;
        }
        
        /* Availability badge styles */
        .badge-availability {
          font-weight: 800;
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 6px;
          text-transform: uppercase;
          display: inline-block;
        }
        .badge-availability.instock {
          background-color: #c6f6d5;
          color: #22543d;
        }
        .badge-availability.limited {
          background-color: #fef3c7;
          color: #d97706;
        }
        .badge-availability.outofstock {
          background-color: #fed7d7;
          color: #742a2a;
        }
        
        /* Price breakup columns custom */
        .price-breakup-grid {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .price-breakup-item {
          display: flex;
          flex-direction: column;
          font-size: 11px;
          line-height: 1.3;
        }
        .price-breakup-item span {
          color: #718096;
          font-weight: 800;
          text-transform: uppercase;
        }
        .price-breakup-item strong {
          color: #2d3748;
          font-size: 14px;
          font-weight: 800;
        }
        .price-breakup-total {
          background-color: #faf7f2;
          border: 1px solid #e7dfd3;
          padding: 8px 16px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .price-breakup-total span {
          color: #8b642b;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .price-breakup-total strong {
          color: #8b642b;
          font-size: 15px;
          font-weight: 900;
        }

        /* Footer and Pagination bar matching screenshots */
        .showroom-table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background-color: #faf7f2;
          border-top: 1px solid #e7dfd3;
        }
        .showroom-footer-info {
          font-size: 14px;
          color: #718096;
          font-weight: 700;
        }
        .showroom-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pagination-btn {
          border: 1px solid #e7dfd3;
          background-color: #ffffff;
          color: #555555;
          font-size: 14px;
          font-weight: 700;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pagination-btn:hover {
          background-color: #f7f3eb;
        }
        .pagination-btn.active {
          background-color: #5d452f;
          border-color: #5d452f;
          color: #ffffff;
          cursor: default;
        }
        .pagination-btn.active:hover {
          background-color: #5d452f;
        }

        @media (max-width: 1100px) {
          .metrics-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .showroom-dashboard-container {
            flex-direction: column;
          }
          .showroom-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #e7dfd3;
            position: static;
            height: auto;
          }
        }
        @media (max-width: 768px) {
          .metrics-container {
            grid-template-columns: 1fr;
          }
          .showroom-page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .price-breakup-grid {
            flex-wrap: wrap;
            gap: 10px;
          }
        }

        /* Inventory and Modal Styles */
        .metric-card-custom.warning-border {
          border-left: 4px solid #dd6b20;
        }
        .metric-card-custom.danger-border {
          border-left: 4px solid #e53e3e;
        }
        .filters-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: #ffffff;
          border: 1px solid #e7dfd3;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          flex-wrap: wrap;
        }
        .filters-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 800;
          color: #4b2822;
        }
        .filter-select {
          background-color: #ffffff;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #4a5568;
          cursor: pointer;
          min-width: 170px;
          outline: none;
          transition: border-color 0.2s;
        }
        .filter-select:focus {
          border-color: #b88f51;
        }
        .clear-all-btn {
          background: none;
          border: none;
          color: #8b642b;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          margin-left: auto;
          transition: color 0.2s;
        }
        .clear-all-btn:hover {
          color: #b88f51;
        }
        .layout-toggle-btn {
          background: #ffffff;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: #555555;
          font-size: 18px;
        }
        .product-thumb {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid #e7dfd3;
          margin-right: 12px;
        }
        .product-title-bold {
          font-weight: 800;
          color: #4b2822;
          font-size: 15px;
        }
        .product-sku-small {
          font-size: 11px;
          color: #888888;
          font-weight: 700;
          margin-top: 2px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          padding: 5px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: fit-content;
        }
        .status-badge.available {
          background-color: #def7ec;
          color: #03543f;
        }
        .status-badge.available::before {
          content: "●";
          color: #31c48d;
          font-size: 8px;
          margin-right: 4px;
        }
        .status-badge.low-stock {
          background-color: #fef3c7;
          color: #723b13;
        }
        .status-badge.low-stock::before {
          content: "●";
          color: #f59e0b;
          font-size: 8px;
          margin-right: 4px;
        }
        .status-badge.out-of-stock {
          background-color: #fde8e8;
          color: #9b1c1c;
        }
        .status-badge.out-of-stock::before {
          content: "●";
          color: #f05252;
          font-size: 8px;
          margin-right: 4px;
        }
        .btn-icon-gold {
          background: none;
          border: none;
          font-size: 18px;
          color: #8b642b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-icon-gold:hover {
          color: #b88f51;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(20, 18, 12, 0.5);
          backdrop-filter: blur(4px);
        }
        .modal-panel {
          width: min(580px, 100%);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          border-radius: 12px;
          background: #fdfaf5;
          border: 1px solid #e7dfd3;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e7dfd3;
          background-color: #faf7f2;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 900;
          color: #4b2822;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #718096;
          cursor: pointer;
          transition: color 0.2s;
        }
        .modal-close-btn:hover {
          color: #4b2822;
        }
        .modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 11px;
          font-weight: 800;
          color: #8b642b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-input {
          background-color: #ffffff;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 15px;
          color: #2d3748;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: #b88f51;
        }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e7dfd3;
          background-color: #faf7f2;
        }

        /* Raise Demand Grid and Form Styles */
        .demand-grid-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .demand-search-box {
          position: relative;
          display: flex;
          align-items: center;
          background: #f1f3f5;
          border-radius: 8px;
          padding: 8px 16px;
          margin-bottom: 20px;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .demand-search-box:focus-within {
          border-color: #b88f51;
          background: #ffffff;
          box-shadow: 0 0 0 2px rgba(184, 143, 81, 0.1);
        }
        .demand-search-box i {
          color: #718096;
          margin-right: 8px;
          font-size: 16px;
        }
        .demand-search-box input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          font-weight: 700;
          color: #4b2822;
        }
        .badge-demand-status {
          font-size: 11px;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
          text-align: center;
          width: fit-content;
        }
        .badge-demand-status.responded {
          background-color: #fef3c7;
          color: #723b13;
        }
        .badge-demand-status.submitted {
          background-color: #b88f51;
          color: #ffffff;
        }
        .badge-demand-status.order-raised {
          background-color: #ebf8ff;
          color: #2b6cb0;
        }
        .demand-form-container {
          background: #ffffff;
          border: 1px solid #e7dfd3;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .demand-form-container h3 {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 900;
          color: #8b642b;
        }
        .form-textarea {
          background-color: #ffffff;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 15px;
          color: #2d3748;
          outline: none;
          transition: border-color 0.2s;
          resize: vertical;
          min-height: 80px;
        }
        .form-textarea:focus {
          border-color: #b88f51;
        }
        .demand-subtext {
          font-size: 11px;
          color: #888888;
          font-weight: 700;
          margin-top: 2px;
          display: block;
        }
        @media (max-width: 1024px) {
          .demand-grid-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Alert Popup Modal Styling */
        .alert-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeInOverlay 0.25s ease-out;
        }
        .alert-popup-panel {
          background-color: #ffffff;
          border-radius: 16px;
          width: 90%;
          max-width: 440px;
          padding: 32px 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: slideUpPanel 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .alert-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .alert-icon-circle.gold {
          background-color: #fef3c7;
          color: #b88f51;
        }
        .alert-icon-circle.green {
          background-color: #def7ec;
          color: #0e9f6e;
        }
        .alert-icon-circle i {
          font-size: 36px;
        }
        .alert-title {
          font-size: 24px;
          font-weight: 800;
          color: #2d3748;
          margin: 0 0 12px 0;
        }
        .alert-text {
          font-size: 15px;
          color: #718096;
          line-height: 1.5;
          margin: 0 0 28px 0;
          font-weight: 600;
        }
        .alert-btn-full {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          font-weight: 800;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .alert-btn-full.gold {
          background-color: #b88f51;
          color: #ffffff;
        }
        .alert-btn-full.gold:hover {
          background-color: #a07840;
        }
        .alert-btn-cancel {
          background: none;
          border: none;
          color: #8b642b;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 16px;
          transition: color 0.2s;
        }
        .alert-btn-cancel:hover {
          color: #4b2822;
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpPanel {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Left Sidebar */}
      <aside className="showroom-sidebar">
        <div className="showroom-sidebar-header">
          <div className="showroom-logo-circle">
            <div className="showroom-logo-inner">COIR</div>
          </div>
          <div className="showroom-sidebar-title">
            <h3>COIR BOARD</h3>
            <p>MINISTRY OF MSME</p>
          </div>
        </div>

        <nav className="showroom-sidebar-menu">
          <button
            className={`showroom-menu-item ${activeMenu === "Dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveMenu("Dashboard");
              setIsAllocatingOrder(false);
            }}
          >
            <i className="bx bx-grid-alt" />
            Dashboard
          </button>
          <button
            className={`showroom-menu-item ${activeMenu === "Inventory" ? "active" : ""}`}
            onClick={() => setActiveMenu("Inventory")}
          >
            <i className="bx bx-package" />
            Inventory
          </button>
          <button
            className={`showroom-menu-item ${activeMenu === "Suppliers" ? "active" : ""}`}
            onClick={() => setActiveMenu("Suppliers")}
          >
            <i className="bx bx-group" />
            Suppliers
          </button>
          <button
            className={`showroom-menu-item ${activeMenu === "Raise Demand" ? "active" : ""}`}
            onClick={() => setActiveMenu("Raise Demand")}
          >
            <i className="bx bx-file" />
            Raise Demand/Response
          </button>
          <button
            className="showroom-menu-item"
            onClick={handleLogout}
            style={{ marginTop: "12px", borderTop: "1px solid #e7dfd3", paddingTop: "12px", borderRadius: 0 }}
          >
            <i className="bx bx-log-out" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Workspace Area */}
      <section className="showroom-main">
        <header className="showroom-topbar">
          <span className="showroom-topbar-title">Showroom Management</span>
          <div className="showroom-topbar-actions">
            <button className="topbar-icon-btn" aria-label="Notifications">
              <i className="bx bx-bell" />
              <span className="notification-dot" />
            </button>
            <button className="topbar-icon-btn" aria-label="User profile">
              <i className="bx bx-user-circle" style={{ fontSize: "24px" }} />
            </button>
          </div>
        </header>

        <div className="showroom-content">
          {activeMenu === "Inventory" ? (
            <>
              {/* Inventory Page Header */}
              <div className="showroom-page-header">
                <div className="showroom-page-meta">
                  <p>OPERATIONAL OVERVIEW</p>
                  <h1>Inventory Overview</h1>
                </div>
                <div className="showroom-header-btns">
                  <button className="btn-outline-gold" onClick={() => alert("Report Exported Successfully!")}>
                    <i className="bx bx-download" />
                    Export Report
                  </button>
                  <button className="btn-outline-gold" onClick={() => setIsAddModalOpen(true)}>
                    <i className="bx bx-plus" />
                    Add Inventory
                  </button>
                  <button className="btn-solid-gold" onClick={() => setActiveMenu("Raise Demand")}>
                    <i className="bx bx-plus" />
                    Raise Demand
                  </button>
                </div>
              </div>

              {/* Metrics Card Grid */}
              <div className="metrics-container">
                <div className="metric-card-custom">
                  <div className="card-top">
                    <span className="card-top-title">TOTAL STOCK VALUE</span>
                    <i className="bx bx-wallet card-top-icon" />
                  </div>
                  <div className="metric-card-val">
                    {`₹${(inventory.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0) / 100000).toFixed(2)} Lakhs`}
                  </div>
                  <div className="metric-footer" style={{ color: "#38a169" }}>
                    <i className="bx bx-trending-up" /> Dynamic update active
                  </div>
                </div>

                <div className="metric-card-custom">
                  <div className="card-top">
                    <span className="card-top-title">TOTAL CATEGORIES</span>
                    <i className="bx bx-category card-top-icon" />
                  </div>
                  <div className="metric-card-val">12</div>
                  <div className="metric-footer" style={{ color: "#718096" }}>
                    Active segments listed
                  </div>
                </div>

                <div className="metric-card-custom warning-border">
                  <div className="card-top">
                    <span className="card-top-title">LOW STOCK ALERTS</span>
                    <i className="bx bx-error card-top-icon" style={{ color: "#dd6b20" }} />
                  </div>
                  <div className="metric-card-val" style={{ color: "#dd6b20" }}>
                    {String(inventory.filter((item) => item.stockStatus === "LOW STOCK").length - 2 + 8).padStart(2, "0")}
                  </div>
                  <div className="metric-footer" style={{ color: "#dd6b20" }}>
                    Attention required
                  </div>
                </div>

                <div className="metric-card-custom danger-border">
                  <div className="card-top">
                    <span className="card-top-title">OUT OF STOCK</span>
                    <i className="bx bx-block card-top-icon" style={{ color: "#e53e3e" }} />
                  </div>
                  <div className="metric-card-val" style={{ color: "#e53e3e" }}>
                    {String(inventory.filter((item) => item.stockStatus === "OUT OF STOCK").length).padStart(2, "0")}
                  </div>
                  <div className="metric-footer" style={{ color: "#e53e3e" }}>
                    Critical restocking needed
                  </div>
                </div>
              </div>

              {/* Filters strip */}
              <div className="filters-strip">
                <span className="filters-label">
                  <i className="bx bx-filter" />
                  Filters:
                </span>
                <select
                  className="filter-select"
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setInventoryPage(1);
                  }}
                  aria-label="Filter by Product Type"
                >
                  <option value="All">All Product Types</option>
                  <option value="Mats & Rugs">Mats & Rugs</option>
                  <option value="Coir Fiber">Coir Fiber</option>
                  <option value="Coir Rope">Coir Rope</option>
                  <option value="Geotextiles">Geotextiles</option>
                  <option value="Rubberized Mattresses">Rubberized Mattresses</option>
                </select>

                <select
                  className="filter-select"
                  value={filterAvailability}
                  onChange={(e) => {
                    setFilterAvailability(e.target.value);
                    setInventoryPage(1);
                  }}
                  aria-label="Filter by Availability"
                >
                  <option value="All">Availability: All</option>
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <select
                  className="filter-select"
                  value={filterSupplier}
                  onChange={(e) => {
                    setFilterSupplier(e.target.value);
                    setInventoryPage(1);
                  }}
                  aria-label="Filter by Supplier"
                >
                  <option value="All">All Suppliers</option>
                  <option value="Kerala Coir Crafts">Kerala Coop / Crafts</option>
                  <option value="Alleppey Weaves">Alleppey Weaves</option>
                  <option value="Malabar Co-op">Malabar Co-op</option>
                  <option value="Southern Fibre Exporters">Southern Fibre Exporters</option>
                  <option value="Malabar Weaves Ltd">Malabar Weaves Ltd</option>
                </select>

                {(filterCategory !== "All" || filterAvailability !== "All" || filterSupplier !== "All") && (
                  <button
                    className="clear-all-btn"
                    onClick={() => {
                      setFilterCategory("All");
                      setFilterAvailability("All");
                      setFilterSupplier("All");
                      setInventoryPage(1);
                    }}
                  >
                    Clear All
                  </button>
                )}

                <button
                  className="layout-toggle-btn"
                  style={{
                    marginLeft:
                      filterCategory === "All" && filterAvailability === "All" && filterSupplier === "All"
                        ? "auto"
                        : "0",
                  }}
                  aria-label="Layout toggle"
                >
                  <i className="bx bx-columns" />
                </button>
              </div>

              {/* Table of inventory */}
              <section className="supplier-response-section">
                <div style={{ overflowX: "auto" }}>
                  <table className="grid-table">
                    <thead>
                      <tr>
                        <th>PRODUCT NAME</th>
                        <th>CATEGORY</th>
                        <th>QUANTITY</th>
                        <th>UNIT PRICE</th>
                        <th>STOCK STATUS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory
                        .filter((item) => {
                          const matchCategory = filterCategory === "All" || item.category === filterCategory;
                          const matchAvailability =
                            filterAvailability === "All" ||
                            (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                            (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                            (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                          const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                          const matchSearch =
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                          return matchCategory && matchAvailability && matchSupplier && matchSearch;
                        })
                        .slice((inventoryPage - 1) * itemsPerPage, inventoryPage * itemsPerPage)
                        .map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={item.image} alt={item.name} className="product-thumb" />
                                <div>
                                  <div className="product-title-bold">{item.name}</div>
                                  <div className="product-sku-small">SKU: {item.sku}</div>
                                </div>
                              </div>
                            </td>
                            <td>{item.category}</td>
                            <td style={{ fontWeight: "700" }}>
                              {item.quantity} {item.unit}
                            </td>
                            <td>₹{item.unitPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                            <td>
                              <span className={`status-badge ${item.stockStatus.toLowerCase().replace(" ", "-")}`}>
                                {item.stockStatus}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn-icon-gold"
                                onClick={() => alert(`Viewing details for SKU: ${item.sku}`)}
                                aria-label={`View details of ${item.name}`}
                              >
                                <i className="bx bx-show" style={{ fontSize: "20px" }} />
                              </button>
                            </td>
                          </tr>
                        ))}

                      {inventory.filter((item) => {
                        const matchCategory = filterCategory === "All" || item.category === filterCategory;
                        const matchAvailability =
                          filterAvailability === "All" ||
                          (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                          (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                          (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                        const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                        const matchSearch =
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                        return matchCategory && matchAvailability && matchSupplier && matchSearch;
                      }).length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#718096" }}>
                            No matching inventory items found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table pagination */}
                <div className="showroom-table-footer">
                  <span className="showroom-footer-info">
                    Showing{" "}
                    {inventory.filter((item) => {
                      const matchCategory = filterCategory === "All" || item.category === filterCategory;
                      const matchAvailability =
                        filterAvailability === "All" ||
                        (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                        (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                        (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                      const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                      const matchSearch =
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchCategory && matchAvailability && matchSupplier && matchSearch;
                    }).length === 0
                      ? 0
                      : (inventoryPage - 1) * itemsPerPage + 1}{" "}
                    to{" "}
                    {Math.min(
                      inventoryPage * itemsPerPage,
                      inventory.filter((item) => {
                        const matchCategory = filterCategory === "All" || item.category === filterCategory;
                        const matchAvailability =
                          filterAvailability === "All" ||
                          (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                          (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                          (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                        const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                        const matchSearch =
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                        return matchCategory && matchAvailability && matchSupplier && matchSearch;
                      }).length
                    )}{" "}
                    of{" "}
                    {
                      inventory.filter((item) => {
                        const matchCategory = filterCategory === "All" || item.category === filterCategory;
                        const matchAvailability =
                          filterAvailability === "All" ||
                          (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                          (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                          (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                        const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                        const matchSearch =
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                        return matchCategory && matchAvailability && matchSupplier && matchSearch;
                      }).length
                    }
                  </span>
                  <div className="showroom-pagination">
                    <button
                      className="pagination-btn"
                      disabled={inventoryPage === 1}
                      onClick={() => setInventoryPage((p) => Math.max(1, p - 1))}
                      aria-label="Previous page"
                    >
                      <i className="bx bx-chevron-left" />
                    </button>
                    {Array.from({
                      length: Math.ceil(
                        inventory.filter((item) => {
                          const matchCategory = filterCategory === "All" || item.category === filterCategory;
                          const matchAvailability =
                            filterAvailability === "All" ||
                            (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                            (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                            (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                          const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                          const matchSearch =
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                          return matchCategory && matchAvailability && matchSupplier && matchSearch;
                        }).length / itemsPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        className={`pagination-btn ${inventoryPage === index + 1 ? "active" : ""}`}
                        onClick={() => setInventoryPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="pagination-btn"
                      disabled={
                        inventoryPage ===
                        Math.ceil(
                          inventory.filter((item) => {
                            const matchCategory = filterCategory === "All" || item.category === filterCategory;
                            const matchAvailability =
                              filterAvailability === "All" ||
                              (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                              (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                              (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                            const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                            const matchSearch =
                              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                            return matchCategory && matchAvailability && matchSupplier && matchSearch;
                          }).length / itemsPerPage
                        )
                      }
                      onClick={() =>
                        setInventoryPage((p) =>
                          Math.min(
                            Math.ceil(
                              inventory.filter((item) => {
                                const matchCategory = filterCategory === "All" || item.category === filterCategory;
                                const matchAvailability =
                                  filterAvailability === "All" ||
                                  (filterAvailability === "Available" && item.stockStatus === "AVAILABLE") ||
                                  (filterAvailability === "Low Stock" && item.stockStatus === "LOW STOCK") ||
                                  (filterAvailability === "Out of Stock" && item.stockStatus === "OUT OF STOCK");
                                const matchSupplier = filterSupplier === "All" || item.supplier === filterSupplier;
                                const matchSearch =
                                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.sku.toLowerCase().includes(searchQuery.toLowerCase());
                                return matchCategory && matchAvailability && matchSupplier && matchSearch;
                              }).length / itemsPerPage
                            ),
                            p + 1
                          )
                        )
                      }
                      aria-label="Next page"
                    >
                      <i className="bx bx-chevron-right" />
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : activeMenu === "Dashboard" ? (
            isAllocatingOrder ? (
              <>
                {/* Order Allocation Screen */}
                <div className="showroom-page-header">
                  <div className="showroom-page-meta">
                    <p>SUPPLY CHAIN INTELLIGENCE</p>
                    <h1>Order Allocation</h1>
                  </div>
                  <button className="btn-outline-gold" onClick={() => setIsAllocatingOrder(false)} style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700" }}>
                    <i className="bx bx-left-arrow-alt" style={{ fontSize: "18px" }} /> Back to Dashboard
                  </button>
                </div>

                {/* Demand Info Summary Banner */}
                <div style={{
                  background: "#faf7f2",
                  border: "1px solid #e7dfd3",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginBottom: "24px"
                }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>Demand id:</span>
                    <h3 style={{ margin: "4px 0 0 0", fontSize: "18px", fontWeight: "900", color: "#4b2822" }}>#{currentDashboardDemand.id}</h3>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>Product Category</span>
                    <h3 style={{ margin: "4px 0 0 0", fontSize: "18px", fontWeight: "900", color: "#4b2822" }}>{currentDashboardDemand.category}</h3>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Raised QTY</span>
                    <h3 style={{ margin: "4px 0 0 0", fontSize: "18px", fontWeight: "900", color: "#4b2822" }}>{currentDashboardDemand.qty}</h3>
                  </div>
                </div>

                {/* Suppliers Allocation List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {suppliers
                    .filter((s) => selectedSupplierIds.includes(s.id))
                    .map((s) => {
                      const pricing = getSupplierPriceForDemand(s, currentDashboardDemand);
                      return (
                        <div key={s.id} style={{
                          background: "#ffffff",
                          border: "1px solid #e7dfd3",
                          borderRadius: "12px",
                          overflow: "hidden",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                        }}>
                          {/* Supplier Row Header */}
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1.5fr 1fr 1fr 1fr 1fr 2fr",
                            gap: "16px",
                            alignItems: "center",
                            padding: "20px 24px",
                            borderBottom: "1px solid #f7f3eb"
                          }}>
                            <div className="checkbox-container">
                              <input type="checkbox" checked={true} readOnly aria-label={`Supplier ${s.name} checked`} />
                            </div>
                            <div className="supplier-name-cell" style={{ fontWeight: "800", color: "#4b2822" }}>{s.name}</div>
                            <div className="rating-stars">
                              <strong style={{ fontSize: "14px", fontWeight: "700" }}>{s.rating.toFixed(1)}/5</strong>
                              <span aria-hidden="true" style={{ fontSize: "13px" }}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <i
                                    key={index}
                                    className={`bx bxs-star ${index < s.stars ? "star-gold" : "star-grey"}`}
                                    style={{ marginRight: "1px" }}
                                  />
                                ))}
                              </span>
                            </div>
                            <div>
                              <span className={`badge-availability ${s.availability.toLowerCase()}`}>
                                {s.availability}
                              </span>
                            </div>
                            <div style={{ fontWeight: "700" }}>{s.stock}</div>
                            <div style={{ fontWeight: "700" }}>{s.fulfillment}</div>
                            <div>
                              <div className="price-breakup-grid">
                                <div className="price-breakup-item">
                                  <span>BASE</span>
                                  <strong>₹{pricing.base}</strong>
                                </div>
                                <div className="price-breakup-item">
                                  <span>TRANS</span>
                                  <strong>₹{pricing.trans}</strong>
                                </div>
                                <div className="price-breakup-item">
                                  <span>TAX</span>
                                  <strong>₹{pricing.tax}</strong>
                                </div>
                                <div className="price-breakup-total">
                                  <span>TOTAL</span>
                                  <strong>₹{pricing.total}</strong>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Allocation Entry Details Panel */}
                          <div style={{ padding: "24px", backgroundColor: "#ffffff", borderTop: "1px solid #f7f3eb" }}>
                            <h4 style={{ margin: "0 0 16px 0", fontSize: "15px", fontWeight: "800", color: "#8b642b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Allocation Entry</h4>
                            
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr 2fr",
                              gap: "16px"
                            }}>
                              <div className="form-group">
                                <label style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Allocated Quantity</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  defaultValue={s.stock}
                                />
                              </div>
                              <div className="form-group">
                                <label style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Agreed Price (Per Unit)</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  defaultValue={`₹ ${pricing.total}`}
                                  readOnly
                                />
                              </div>
                              <div className="form-group">
                                <label style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Delivery Timeline</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  defaultValue="11/04/2026"
                                />
                              </div>
                              <div className="form-group">
                                <label style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Remarks/Comments</label>
                                <input
                                  type="text"
                                  className="form-input"
                                  placeholder="e.g. priority transit required"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Submit Button Block */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
                  <button
                    className="btn-solid-gold"
                    style={{ padding: "16px 40px", fontSize: "16px", fontWeight: "800" }}
                    onClick={() => setShowOrderConfirmPopup(true)}
                  >
                    Submit Order
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Original Dashboard Operations Section */}
                <div className="showroom-page-header">
                  <div className="showroom-page-meta">
                    <p>ADMINISTRATIVE CONTROL</p>
                    <h1>Showroom Operations</h1>
                  </div>
                  <div className="showroom-header-btns">
                    <button className="btn-outline-gold" onClick={() => setActiveMenu("Raise Demand")}>
                      <i className="bx bx-file" />
                      Supplier Response
                    </button>
                    <button className="btn-solid-gold" onClick={() => setActiveMenu("Raise Demand")}>
                      <i className="bx bx-cart" />
                      Raise Demand
                    </button>
                  </div>
                </div>

                {/* Metrics Card Grid */}
                <div className="metrics-container">
                  <div className="metric-card-custom">
                    <div className="card-top">
                      <span className="card-top-title">INVENTORY</span>
                      <i className="bx bx-receipt card-top-icon" />
                    </div>
                    <div className="metric-card-val">
                      12,482 <span style={{ fontSize: "14px", fontWeight: "700", color: "#a0aec0" }}>SKUs</span>
                    </div>
                    <div className="metric-footer" style={{ color: "#38a169" }}>
                      <i className="bx bx-trending-up" /> 4.2% from last month
                    </div>
                  </div>

                  <div className="metric-card-custom">
                    <div className="card-top">
                      <span className="card-top-title">TOTAL REVENUE</span>
                      <i className="bx bx-wallet card-top-icon" />
                    </div>
                    <div className="metric-card-val">₹82.5 Lakhs</div>
                    <div className="metric-footer" style={{ color: "#38a169" }}>
                      <i className="bx bx-trending-up" /> 12.5% Q/Q Performance
                    </div>
                  </div>

                  <div className="metric-card-custom">
                    <div className="card-top">
                      <span className="card-top-title">NET PROFIT</span>
                      <i className="bx bx-line-chart card-top-icon" />
                    </div>
                    <div className="metric-card-val">₹12.8 Lakhs</div>
                    <div className="metric-badge-green">+15%</div>
                  </div>

                  {/* Dark Gold Theme Compliance Card */}
                  <div className="metric-card-custom gold-theme">
                    <div className="card-top">
                      <span className="card-top-title" style={{ color: "#e9dcc5" }}>
                        COMPLIANCE DATA
                      </span>
                      <i className="bx bx-badge-check card-top-icon" style={{ color: "#e9dcc5" }} />
                    </div>
                    <div className="compliance-sub-row" style={{ marginTop: "12px" }}>
                      <div className="compliance-item">
                        <span className="compliance-label">ROYALTY ACCRUED</span>
                        <span className="compliance-val">₹4.12 Lakhs</span>
                      </div>
                      <div className="compliance-item">
                        <span className="compliance-label">INVOICED AMOUNT</span>
                        <span className="compliance-val">₹64.2 Lakhs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supplier Responses Section */}
                <section className="supplier-response-section">
                  <div className="section-header-custom">
                    <h2>Supplier Response</h2>
                    <div className="section-header-actions">
                      <button aria-label="Filter responses">
                        <i className="bx bx-slider-alt" />
                      </button>
                      <button aria-label="Download responses">
                        <i className="bx bx-download" />
                      </button>
                    </div>
                  </div>

                  {(() => {
                    const isOrderPlaced = currentDashboardDemand?.status === "ORDER PLACED";
                    const orderDetail = placedOrders.find((o) => o.demandId === currentDashboardDemand?.id);

                    if (isOrderPlaced && orderDetail) {
                      return (
                        <>
                          {/* Order Placed Demand Strip */}
                          <div className="demand-info-strip" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                              <span className="demand-id-badge" style={{ margin: 0 }}>DEMAND ID:</span>
                              <select
                                value={activeDemandId}
                                onChange={(e) => setActiveDemandId(e.target.value)}
                                style={{
                                  background: "#ffffff",
                                  border: "1px solid #e7dfd3",
                                  borderRadius: "6px",
                                  padding: "6px 12px",
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  color: "#4b2822",
                                  outline: "none",
                                  cursor: "pointer"
                                }}
                                aria-label="Select active demand"
                              >
                                {demands.map((d) => (
                                  <option key={d.id} value={d.id}>
                                    #{d.id} ({d.productName})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                              <span style={{ fontWeight: "800", color: "#8b642b", fontSize: "14px" }}>
                                ORDER PLACED ON: {orderDetail.orderDate}
                              </span>
                              <button
                                className="btn-solid-gold"
                                style={{ padding: "8px 18px", fontSize: "13px", backgroundColor: "#cbb493", color: "#ffffff", border: "none", cursor: "default" }}
                                disabled
                              >
                                Order Placed
                              </button>
                            </div>
                          </div>

                          {/* Ordered Table */}
                          <div style={{ overflowX: "auto" }}>
                            <table className="grid-table">
                              <thead>
                                <tr>
                                  <th>SUPPLIER NAME</th>
                                  <th>RATING</th>
                                  <th>STATUS</th>
                                  <th>ALLOCATED QTY.</th>
                                  <th>FULFILLMENT</th>
                                  <th>PER UNIT PRICE BREAKUP</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderDetail.allocations.map((alloc: any) => (
                                  <tr key={alloc.supplierId}>
                                    <td className="supplier-name-cell" style={{ fontWeight: "800" }}>{alloc.supplierName}</td>
                                    <td>
                                      <div className="rating-stars">
                                        <strong style={{ fontSize: "14px", fontWeight: "700" }}>{alloc.rating.toFixed(1)}/5</strong>
                                        <span aria-hidden="true" style={{ fontSize: "13px" }}>
                                          {Array.from({ length: 5 }).map((_, index) => (
                                            <i
                                              key={index}
                                              className={`bx bxs-star ${index < alloc.stars ? "star-gold" : "star-grey"}`}
                                              style={{ marginRight: "1px" }}
                                            />
                                          ))}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="badge-availability" style={{ backgroundColor: "#def7ec", color: "#03543f", fontWeight: "800", fontSize: "11px", padding: "6px 12px", borderRadius: "6px" }}>
                                        ORDER PLACED
                                      </span>
                                    </td>
                                    <td style={{ fontWeight: "700" }}>{alloc.allocatedQty}</td>
                                    <td>{alloc.fulfillment}</td>
                                    <td>
                                      <div className="price-breakup-grid">
                                        <div className="price-breakup-item">
                                          <span>BASE</span>
                                          <strong>₹{alloc.priceBreakup.base}</strong>
                                        </div>
                                        <div className="price-breakup-item">
                                          <span>TRANS</span>
                                          <strong>₹{alloc.priceBreakup.trans}</strong>
                                        </div>
                                        <div className="price-breakup-item">
                                          <span>TAX</span>
                                          <strong>₹{alloc.priceBreakup.tax}</strong>
                                        </div>
                                        <div className="price-breakup-total">
                                          <span>TOTAL</span>
                                          <strong>₹{alloc.priceBreakup.total}</strong>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      );
                    }

                    return (
                      <>
                        {/* Demand Strip */}
                        <div className="demand-info-strip" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            <span className="demand-id-badge" style={{ margin: 0 }}>DEMAND ID:</span>
                            <select
                              value={activeDemandId}
                              onChange={(e) => setActiveDemandId(e.target.value)}
                              style={{
                                background: "#ffffff",
                                border: "1px solid #e7dfd3",
                                borderRadius: "6px",
                                padding: "6px 12px",
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#4b2822",
                                outline: "none",
                                cursor: "pointer"
                              }}
                              aria-label="Select active demand"
                            >
                              {demands.map((d) => (
                                <option key={d.id} value={d.id}>
                                  #{d.id} ({d.productName})
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            className="btn-solid-gold"
                            style={{ padding: "8px 18px", fontSize: "13px" }}
                            onClick={handlePlaceOrder}
                          >
                            Place Order
                          </button>
                        </div>

                        {/* Suppliers Response Grid */}
                        <div style={{ overflowX: "auto" }}>
                          <table className="grid-table">
                            <thead>
                              <tr>
                                <th className="checkbox-container">
                                  <input
                                    type="checkbox"
                                    checked={selectedSupplierIds.length === suppliers.length}
                                    onChange={toggleSelectAll}
                                    aria-label="Select all suppliers"
                                  />
                                </th>
                                <th>SUPPLIER NAME</th>
                                <th>RATING</th>
                                <th>AVAILABILITY</th>
                                <th>STOCK</th>
                                <th>FULFILLMENT</th>
                                <th>PER UNIT PRICE BREAKUP</th>
                              </tr>
                            </thead>
                            <tbody>
                              {suppliers.map((s) => {
                                const pricing = getSupplierPriceForDemand(s, currentDashboardDemand);
                                return (
                                  <tr key={s.id}>
                                    <td className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        checked={selectedSupplierIds.includes(s.id)}
                                        onChange={() => toggleSelect(s.id)}
                                        aria-label={`Select ${s.name}`}
                                      />
                                    </td>
                                    <td className="supplier-name-cell">{s.name}</td>
                                    <td>
                                      <div className="rating-stars">
                                        <strong style={{ fontSize: "14px", fontWeight: "700" }}>{s.rating.toFixed(1)}/5</strong>
                                        <span aria-hidden="true" style={{ fontSize: "13px" }}>
                                          {Array.from({ length: 5 }).map((_, index) => (
                                            <i
                                              key={index}
                                              className={`bx bxs-star ${index < s.stars ? "star-gold" : "star-grey"}`}
                                              style={{ marginRight: "1px" }}
                                            />
                                          ))}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <span className={`badge-availability ${s.availability.toLowerCase()}`}>
                                        {s.availability}
                                      </span>
                                    </td>
                                    <td>{s.stock}</td>
                                    <td>{s.fulfillment}</td>
                                    <td>
                                      <div className="price-breakup-grid">
                                        <div className="price-breakup-item">
                                          <span>BASE</span>
                                          <strong>₹{pricing.base}</strong>
                                        </div>
                                        <div className="price-breakup-item">
                                          <span>TRANS</span>
                                          <strong>₹{pricing.trans}</strong>
                                        </div>
                                        <div className="price-breakup-item">
                                          <span>TAX</span>
                                          <strong>₹{pricing.tax}</strong>
                                        </div>
                                        <div className="price-breakup-total">
                                          <span>TOTAL</span>
                                          <strong>₹{pricing.total}</strong>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination strip matching screenshots */}
                        <div className="showroom-table-footer">
                          <span className="showroom-footer-info">Showing 1 to 6</span>
                          <div className="showroom-pagination">
                            <button className="pagination-btn" aria-label="Previous page">
                              <i className="bx bx-chevron-left" />
                            </button>
                            <button className="pagination-btn active">1</button>
                            <button
                              className="pagination-btn"
                              onClick={() => alert("Page 2 results are mock representation")}
                            >
                              2
                            </button>
                            <button className="pagination-btn" aria-label="Next page">
                              <i className="bx bx-chevron-right" />
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </section>
              </>
            )
          ) : activeMenu === "Raise Demand" ? (
            <>
              {/* Procurement Header */}
              <div className="showroom-page-header">
                <div className="showroom-page-meta">
                  <p>PROCUREMENT SYSTEM</p>
                  <h1>Raise Demand and Response</h1>
                </div>
              </div>

              {/* Grid split */}
              <div className="demand-grid-layout">
                {/* Left Column: Active Demand Pipeline */}
                <section className="supplier-response-section" style={{ padding: "24px" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "900", color: "#4b2822" }}>Active Demand Pipeline</h3>
                  
                  {/* Search Bar */}
                  <div className="demand-search-box">
                    <i className="bx bx-search" />
                    <input
                      type="text"
                      placeholder="Filter IDs..."
                      value={demandSearch}
                      onChange={(e) => setDemandSearch(e.target.value)}
                      aria-label="Filter demands"
                    />
                  </div>

                  {/* Demands Table */}
                  <div style={{ overflowX: "auto", marginTop: "12px" }}>
                    <table className="grid-table">
                      <thead>
                        <tr>
                          <th>DEMAND ID</th>
                          <th>PRODUCT CATEGORY</th>
                          <th>QTY</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demands
                          .filter((item) => {
                            const matchSearch =
                              item.id.toLowerCase().includes(demandSearch.toLowerCase()) ||
                              item.category.toLowerCase().includes(demandSearch.toLowerCase());
                            return matchSearch;
                          })
                          .map((item) => (
                            <tr key={item.id}>
                              <td style={{ fontWeight: "800", color: "#4b2822" }}>#{item.id}</td>
                              <td>
                                <span style={{ fontWeight: "700", color: "#2d3748" }}>{item.category}</span>
                                <span className="demand-subtext">{item.dateText}</span>
                              </td>
                              <td style={{ fontWeight: "700" }}>{item.qty}</td>
                              <td>
                                <span className={`badge-demand-status ${item.status.toLowerCase().replace(" ", "-")}`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        {demands.filter((item) => {
                          const matchSearch =
                            item.id.toLowerCase().includes(demandSearch.toLowerCase()) ||
                            item.category.toLowerCase().includes(demandSearch.toLowerCase());
                          return matchSearch;
                        }).length === 0 && (
                          <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "#718096" }}>
                              No matching demands found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Right Column: Raise New Demand Form */}
                <section className="demand-form-container">
                  <h3>Raise New Demand</h3>
                  <form onSubmit={handleRaiseDemandSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    
                    <div className="form-group">
                      <label htmlFor="demand-cat">Product Category</label>
                      <select
                        id="demand-cat"
                        className="form-input"
                        value={demandCategory}
                        onChange={(e) => setDemandCategory(e.target.value)}
                      >
                        <option value="Mats & Rugs">Mats & Rugs</option>
                        <option value="Premium Coir Pith">Premium Coir Pith</option>
                        <option value="Rubberized Mattresses">Rubberized Mattresses</option>
                        <option value="Curled Coir Rope">Curled Coir Rope</option>
                        <option value="Geotextiles">Geotextiles</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-pname">Product Name</label>
                      <select
                        id="demand-pname"
                        className="form-input"
                        value={demandProductName}
                        onChange={(e) => setDemandProductName(e.target.value)}
                      >
                        {demandCategory === "Mats & Rugs" && (
                          <>
                            <option value="Premium Door Mat">Premium Door Mat</option>
                            <option value="Coir Corridor Mat">Coir Corridor Mat</option>
                          </>
                        )}
                        {demandCategory === "Premium Coir Pith" && (
                          <>
                            <option value="Coir Pith Compost Block">Coir Pith Compost Block</option>
                            <option value="Coco Peat Disc">Coco Peat Disc</option>
                          </>
                        )}
                        {demandCategory === "Rubberized Mattresses" && (
                          <>
                            <option value="Rubberized Coir Mattress">Rubberized Coir Mattress</option>
                            <option value="Orthopaedic Coir Mattress">Orthopaedic Coir Mattress</option>
                          </>
                        )}
                        {demandCategory === "Curled Coir Rope" && (
                          <>
                            <option value="Marine Grade Coir Rope">Marine Grade Coir Rope</option>
                            <option value="Twisted Curled Rope">Twisted Curled Rope</option>
                          </>
                        )}
                        {demandCategory === "Geotextiles" && (
                          <>
                            <option value="Erosion Control Mesh">Erosion Control Mesh</option>
                            <option value="Coir Geonet">Coir Geonet</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-q">Required Quantity</label>
                      <input
                        id="demand-q"
                        type="number"
                        min="1"
                        className="form-input"
                        placeholder="e.g. 2500"
                        value={demandQty}
                        onChange={(e) => setDemandQty(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-qtype">Quantity Type</label>
                      <select
                        id="demand-qtype"
                        className="form-input"
                        value={demandQtyType}
                        onChange={(e) => setDemandQtyType(e.target.value)}
                      >
                        <option value="Square Meter (m²)">Square Meter (m²)</option>
                        <option value="Units">Units</option>
                        <option value="Tons">Tons</option>
                        <option value="kg">kg</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-ddate">Expected Delivery Date</label>
                      <input
                        id="demand-ddate"
                        type="text"
                        className="form-input"
                        placeholder="DD/MM/YYYY"
                        value={demandDate}
                        onChange={(e) => setDemandDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-spec">Product Specification</label>
                      <textarea
                        id="demand-spec"
                        className="form-textarea"
                        placeholder="e.g. compressed eco-grade blocks"
                        value={demandSpec}
                        onChange={(e) => setDemandSpec(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-rem">Remarks (Optional)</label>
                      <textarea
                        id="demand-rem"
                        className="form-textarea"
                        placeholder="e.g. urgent lot preferred"
                        value={demandRemarks}
                        onChange={(e) => setDemandRemarks(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="demand-pincode">Delivery Pin Code</label>
                      <input
                        id="demand-pincode"
                        type="text"
                        className="form-input"
                        placeholder="e.g. 682030"
                        value={demandPin}
                        onChange={(e) => setDemandPin(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn-solid-gold" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }}>
                      Submit Demand
                    </button>
                    <button type="button" className="btn-outline-gold" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={() => alert("Draft Saved Successfully!")}>
                      Save Draft
                    </button>
                  </form>
                </section>
              </div>
            </>
          ) : activeMenu === "Suppliers" ? (
            <>
              {/* Suppliers Page Header */}
              <div className="showroom-page-header">
                <div className="showroom-page-meta">
                  <p>OPERATIONAL DIRECTORY</p>
                  <h1>Suppliers Directory</h1>
                </div>
                <div className="showroom-header-btns">
                  <button className="btn-solid-gold" onClick={() => setIsAddSupplierModalOpen(true)}>
                    <i className="bx bx-plus" />
                    Add Supplier
                  </button>
                </div>
              </div>

              {/* Metrics Card Grid */}
              {(() => {
                const totalPartners = suppliers.length;
                const avgRating = totalPartners > 0 
                  ? (suppliers.reduce((acc, s) => acc + s.rating, 0) / totalPartners).toFixed(1)
                  : "0.0";
                
                const topSupplier = totalPartners > 0
                  ? [...suppliers].sort((a, b) => b.rating - a.rating)[0]?.name
                  : "None";

                return (
                  <div className="metrics-container">
                    <div className="metric-card-custom">
                      <div className="card-top">
                        <span className="card-top-title">TOTAL PARTNERS</span>
                        <i className="bx bx-group card-top-icon" />
                      </div>
                      <div className="metric-card-val">
                        {totalPartners} <span style={{ fontSize: "14px", fontWeight: "700", color: "#a0aec0" }}>Suppliers</span>
                      </div>
                      <div className="metric-footer" style={{ color: "#38a169" }}>
                        <i className="bx bx-check-shield" /> Active directory partners
                      </div>
                    </div>

                    <div className="metric-card-custom">
                      <div className="card-top">
                        <span className="card-top-title">AVERAGE RATING</span>
                        <i className="bx bx-star card-top-icon" />
                      </div>
                      <div className="metric-card-val">{avgRating} / 5.0</div>
                      <div className="metric-footer" style={{ color: "#b88f51" }}>
                        Quality & performance score
                      </div>
                    </div>

                    <div className="metric-card-custom gold-theme">
                      <div className="card-top">
                        <span className="card-top-title" style={{ color: "#e9dcc5" }}>TOP PERFORMER</span>
                        <i className="bx bx-medal card-top-icon" style={{ color: "#e9dcc5" }} />
                      </div>
                      <div className="metric-card-val" style={{ fontSize: "18px", marginTop: "12px", color: "#ffffff", fontWeight: "900" }}>
                        {topSupplier}
                      </div>
                      <div className="metric-footer" style={{ color: "#e9dcc5" }}>
                        Highest rated partner
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Suppliers List Section */}
              <section className="supplier-response-section" style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                  <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "900", color: "#4b2822" }}>Supplier Directory List</h3>
                  <div style={{ position: "relative", width: "260px" }}>
                    <i className="bx bx-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#a0aec0", fontSize: "18px" }} />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search suppliers..."
                      value={supplierSearch}
                      onChange={(e) => setSupplierSearch(e.target.value)}
                      style={{ paddingLeft: "36px", height: "40px" }}
                    />
                  </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table className="grid-table">
                    <thead>
                      <tr>
                        <th>SUPPLIER NAME</th>
                        <th>RATING</th>
                        <th>AVAILABILITY</th>
                        <th>STOCK CAPACITY</th>
                        <th>LEAD TIME</th>
                        <th>UNIT PRICE BREAKUP</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suppliers
                        .filter((s) => s.name.toLowerCase().includes(supplierSearch.toLowerCase()))
                        .map((s) => (
                          <tr key={s.id}>
                            <td className="supplier-name-cell" style={{ fontWeight: "800" }}>{s.name}</td>
                            <td>
                              <div className="rating-stars">
                                <strong style={{ fontSize: "14px", fontWeight: "700" }}>{s.rating.toFixed(1)}/5</strong>
                                <span aria-hidden="true" style={{ fontSize: "13px" }}>
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <i
                                      key={index}
                                      className={`bx bxs-star ${index < s.stars ? "star-gold" : "star-grey"}`}
                                      style={{ marginRight: "1px" }}
                                    />
                                  ))}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge-availability ${s.availability.toLowerCase().replace(" ", "-")}`}>
                                {s.availability}
                              </span>
                            </td>
                            <td style={{ fontWeight: "700" }}>{s.stock} units</td>
                            <td>{s.fulfillment}</td>
                            <td>
                              <div className="price-breakup-grid">
                                <div className="price-breakup-item">
                                  <span>BASE</span>
                                  <strong>₹{s.base}</strong>
                                </div>
                                <div className="price-breakup-item">
                                  <span>TRANS</span>
                                  <strong>₹{s.trans}</strong>
                                </div>
                                <div className="price-breakup-item">
                                  <span>TAX</span>
                                  <strong>₹{s.tax}</strong>
                                </div>
                                <div className="price-breakup-total">
                                  <span>TOTAL</span>
                                  <strong>₹{s.total}</strong>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn-icon-gold"
                                onClick={() => handleDeleteSupplier(s.id)}
                                style={{ color: "#e53e3e", border: "none", background: "none", cursor: "pointer" }}
                                aria-label={`Delete ${s.name}`}
                              >
                                <i className="bx bx-trash" style={{ fontSize: "20px" }} />
                              </button>
                            </td>
                          </tr>
                        ))}

                      {suppliers.filter((s) => s.name.toLowerCase().includes(supplierSearch.toLowerCase())).length === 0 && (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center", padding: "24px", color: "#a0aec0" }}>
                            No suppliers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            <div style={{ 
              background: "#ffffff", 
              border: "1px solid #e7dfd3", 
              borderRadius: "12px", 
              padding: "60px 24px", 
              textAlign: "center", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.02)" 
            }}>
              <i className="bx bx-file" style={{ fontSize: "64px", color: "#b88f51", marginBottom: "16px", display: "block" }} />
              <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#4b2822", margin: "0 0 8px 0" }}>{activeMenu} Overview</h2>
              <p style={{ fontSize: "15px", color: "#718096", margin: 0, fontWeight: "700" }}>This module is currently under active development.</p>
            </div>
          )}
        </div>

        <ApplicationFooter />
      </section>

      {/* Order Allocation Confirmation Alert Popup */}
      {showOrderConfirmPopup && (
        <div className="alert-popup-overlay">
          <div className="alert-popup-panel">
            <div className="alert-icon-circle gold">
              <i className="bx bxs-badge-check" />
            </div>
            <h2 className="alert-title">Confirmation Alert</h2>
            <p className="alert-text">
              Are you sure you want to submit the <br />
              <strong>"ORDER ALLOCATION"</strong>
            </p>
            <button className="alert-btn-full gold" onClick={confirmOrderSubmission}>
              Yes, Submit
            </button>
            <button className="alert-btn-cancel" onClick={() => setShowOrderConfirmPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Order Allocation Successful Popup */}
      {showOrderSuccessPopup && (
        <div className="alert-popup-overlay">
          <div className="alert-popup-panel" style={{ maxWidth: "460px" }}>
            <div className="alert-icon-circle green">
              <i className="bx bx-check" style={{ color: "#0e9f6e", fontSize: "40px" }} />
            </div>
            <h2 className="alert-title">Successful</h2>
            <p className="alert-text" style={{ marginBottom: "20px" }}>
              Order Allocation has been submitted
            </p>
            
            {/* Selected Suppliers Cards List */}
            <div style={{ width: "100%", marginBottom: "24px" }}>
              {selectedSupplierIds.map((id) => {
                const s = suppliers.find((sup) => sup.id === id);
                return (
                  <div key={id} style={{
                    background: "#fdfcfa",
                    border: "1px solid #f3ece0",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px"
                  }}>
                    <span style={{ fontSize: "11px", fontWeight: "800", color: "#a0aec0" }}>SUPPLIER :</span>
                    <strong style={{ fontSize: "13px", fontWeight: "800", color: "#8b642b" }}>{s?.name}</strong>
                  </div>
                );
              })}
            </div>

            <button
              className="alert-btn-full gold"
              onClick={() => {
                setShowOrderSuccessPopup(false);
                setIsAllocatingOrder(false);
                setActiveMenu("Dashboard");
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Add Supplier Modal Overlay */}
      {isAddSupplierModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddSupplierModalOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "550px", padding: "28px" }}>
            <div className="modal-header">
              <h2>Add New Supplier Partner</h2>
              <button type="button" aria-label="Close modal" onClick={() => setIsAddSupplierModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleAddSupplier} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              <div className="form-group">
                <label htmlFor="sup-name" style={{ fontSize: "12px", fontWeight: "800", color: "#8b642b" }}>Supplier Name</label>
                <input
                  id="sup-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Kerala Coir Fibers Ltd"
                  value={newSupName}
                  onChange={(e) => setNewSupName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="sup-rating" style={{ fontSize: "12px", fontWeight: "800", color: "#8b642b" }}>Supplier Rating (1.0 to 5.0)</label>
                  <input
                    id="sup-rating"
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    className="form-input"
                    value={newSupRating}
                    onChange={(e) => setNewSupRating(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sup-avail" style={{ fontSize: "12px", fontWeight: "800", color: "#8b642b" }}>Availability Status</label>
                  <select
                    id="sup-avail"
                    className="form-input"
                    value={newSupAvailability}
                    onChange={(e) => setNewSupAvailability(e.target.value as any)}
                  >
                    <option value="IN STOCK">IN STOCK</option>
                    <option value="LIMITED">LIMITED</option>
                    <option value="OUT OF STOCK">OUT OF STOCK</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="sup-stock" style={{ fontSize: "12px", fontWeight: "800", color: "#8b642b" }}>Stock Capacity</label>
                  <input
                    id="sup-stock"
                    type="number"
                    min="0"
                    className="form-input"
                    value={newSupStock}
                    onChange={(e) => setNewSupStock(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sup-full" style={{ fontSize: "12px", fontWeight: "800", color: "#8b642b" }}>Lead Time / Fulfillment</label>
                  <input
                    id="sup-full"
                    type="text"
                    className="form-input"
                    placeholder="e.g. 15 Days"
                    value={newSupFulfillment}
                    onChange={(e) => setNewSupFulfillment(e.target.value)}
                    required
                  />
                </div>
              </div>

              <h4 style={{ margin: "8px 0 0 0", fontSize: "12px", fontWeight: "800", color: "#8b642b", textTransform: "uppercase" }}>Per Unit Pricing (₹)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label htmlFor="sup-base" style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b" }}>Base Price</label>
                  <input
                    id="sup-base"
                    type="number"
                    min="0"
                    className="form-input"
                    value={newSupBase}
                    onChange={(e) => setNewSupBase(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sup-trans" style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b" }}>Transit Price</label>
                  <input
                    id="sup-trans"
                    type="number"
                    min="0"
                    className="form-input"
                    value={newSupTrans}
                    onChange={(e) => setNewSupTrans(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sup-tax" style={{ fontSize: "11px", fontWeight: "800", color: "#8b642b" }}>Tax Amount</label>
                  <input
                    id="sup-tax"
                    type="number"
                    min="0"
                    className="form-input"
                    value={newSupTax}
                    onChange={(e) => setNewSupTax(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" className="btn-outline-gold" onClick={() => setIsAddSupplierModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-solid-gold">Submit Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Placed Order Read-Only Details Modal */}
      {selectedPlacedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedPlacedOrder(null)} style={{ zIndex: 1900 }}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "900px", padding: "28px" }}>
            <div className="modal-header">
              <h2>Placed Order Details</h2>
              <button type="button" aria-label="Close modal" onClick={() => setSelectedPlacedOrder(null)}>×</button>
            </div>

            <div style={{
              background: "#faf7f2",
              border: "1px solid #e7dfd3",
              borderRadius: "12px",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px"
            }}>
              <div>
                <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase" }}>Demand id:</span>
                <h3 style={{ margin: "2px 0 0 0", fontSize: "16px", fontWeight: "900", color: "#4b2822" }}>#{selectedPlacedOrder.demandId}</h3>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase" }}>Product Name:</span>
                <h3 style={{ margin: "2px 0 0 0", fontSize: "16px", fontWeight: "900", color: "#4b2822" }}>{selectedPlacedOrder.productName}</h3>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase" }}>Order Date:</span>
                <h3 style={{ margin: "2px 0 0 0", fontSize: "16px", fontWeight: "900", color: "#4b2822" }}>{selectedPlacedOrder.orderDate}</h3>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#8b642b", fontWeight: "800", textTransform: "uppercase" }}>Total Quantity:</span>
                <h3 style={{ margin: "2px 0 0 0", fontSize: "16px", fontWeight: "900", color: "#4b2822" }}>{selectedPlacedOrder.totalQty}</h3>
              </div>
            </div>

            <div style={{ overflowX: "auto", maxHeight: "400px" }}>
              <table className="grid-table">
                <thead>
                  <tr>
                    <th>SUPPLIER NAME</th>
                    <th>RATING</th>
                    <th>STATUS</th>
                    <th>ALLOCATED QTY.</th>
                    <th>FULFILLMENT</th>
                    <th>PER UNIT PRICE BREAKUP</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlacedOrder.allocations.map((alloc: any) => (
                    <tr key={alloc.supplierId}>
                      <td className="supplier-name-cell" style={{ fontWeight: "800" }}>{alloc.supplierName}</td>
                      <td>
                        <div className="rating-stars">
                          <strong style={{ fontSize: "14px", fontWeight: "700" }}>{alloc.rating.toFixed(1)}/5</strong>
                          <span aria-hidden="true" style={{ fontSize: "13px" }}>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <i
                                key={index}
                                className={`bx bxs-star ${index < alloc.stars ? "star-gold" : "star-grey"}`}
                                style={{ marginRight: "1px" }}
                              />
                            ))}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge-availability" style={{ backgroundColor: "#def7ec", color: "#03543f", fontWeight: "800", fontSize: "11px", padding: "6px 12px", borderRadius: "6px" }}>
                          ORDER PLACED
                        </span>
                      </td>
                      <td style={{ fontWeight: "700" }}>{alloc.allocatedQty}</td>
                      <td>{alloc.fulfillment}</td>
                      <td>
                        <div className="price-breakup-grid">
                          <div className="price-breakup-item">
                            <span>BASE</span>
                            <strong>₹{alloc.priceBreakup.base}</strong>
                          </div>
                          <div className="price-breakup-item">
                            <span>TRANS</span>
                            <strong>₹{alloc.priceBreakup.trans}</strong>
                          </div>
                          <div className="price-breakup-item">
                            <span>TAX</span>
                            <strong>₹{alloc.priceBreakup.tax}</strong>
                          </div>
                          <div className="price-breakup-total">
                            <span>TOTAL</span>
                            <strong>₹{alloc.priceBreakup.total}</strong>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button
                type="button"
                className="btn-solid-gold"
                style={{ padding: "10px 24px" }}
                onClick={() => setSelectedPlacedOrder(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Inventory Item</h2>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)} aria-label="Close modal">
                &times;
              </button>
            </div>
            <form onSubmit={handleAddInventory}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="prod-name">Product Name</label>
                  <input
                    id="prod-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Premium Door Mat"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-sku">SKU Code</label>
                  <input
                    id="prod-sku"
                    type="text"
                    className="form-input"
                    placeholder="e.g. COIR-MAT-002"
                    value={newItemSku}
                    onChange={(e) => setNewItemSku(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-cat">Category</label>
                  <select
                    id="prod-cat"
                    className="form-input"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                  >
                    <option value="Mats & Rugs">Mats & Rugs</option>
                    <option value="Coir Fiber">Coir Fiber</option>
                    <option value="Coir Rope">Coir Rope</option>
                    <option value="Geotextiles">Geotextiles</option>
                    <option value="Rubberized Mattresses">Rubberized Mattresses</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="form-group">
                    <label htmlFor="prod-qty">Quantity</label>
                    <input
                      id="prod-qty"
                      type="number"
                      min="0"
                      className="form-input"
                      placeholder="e.g. 100"
                      value={newItemQuantity}
                      onChange={(e) => setNewItemQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prod-unit">Unit Type</label>
                    <select
                      id="prod-unit"
                      className="form-input"
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                    >
                      <option value="units">units</option>
                      <option value="kg">kg</option>
                      <option value="rolls">rolls</option>
                      <option value="tons">tons</option>
                      <option value="m²">m²</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="prod-price">Unit Price (₹)</label>
                  <input
                    id="prod-price"
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-input"
                    placeholder="e.g. 450.00"
                    value={newItemUnitPrice}
                    onChange={(e) => setNewItemUnitPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-supplier">Supplier</label>
                  <select
                    id="prod-supplier"
                    className="form-input"
                    value={newItemSupplier}
                    onChange={(e) => setNewItemSupplier(e.target.value)}
                  >
                    <option value="Kerala Coir Crafts">Kerala Coop / Crafts</option>
                    <option value="Alleppey Weaves">Alleppey Weaves</option>
                    <option value="Malabar Co-op">Malabar Co-op</option>
                    <option value="Southern Fibre Exporters">Southern Fibre Exporters</option>
                    <option value="Malabar Weaves Ltd">Malabar Weaves Ltd</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-outline-gold"
                  style={{ padding: "8px 18px" }}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-solid-gold" style={{ padding: "8px 18px" }}>
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Alert Popup */}
      {showConfirmPopup && (
        <div className="alert-popup-overlay">
          <div className="alert-popup-panel">
            <div className="alert-icon-circle gold">
              <i className="bx bxs-badge-check" />
            </div>
            <h2 className="alert-title">Confirmation Alert</h2>
            <p className="alert-text">
              Are you sure you want to submit the <br />
              <strong>"Product Demand"</strong>
            </p>
            <button className="alert-btn-full gold" onClick={confirmSubmission}>
              Yes, Submit
            </button>
            <button className="alert-btn-cancel" onClick={() => setShowConfirmPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Successful Submission Popup */}
      {showSuccessPopup && (
        <div className="alert-popup-overlay">
          <div className="alert-popup-panel">
            <div className="alert-icon-circle green">
              <i className="bx bx-check" style={{ color: "#0e9f6e", fontSize: "40px" }} />
            </div>
            <h2 className="alert-title">Successful</h2>
            <p className="alert-text">
              Product Demand has been <br />
              submitted Successfully.
            </p>
            <button
              className="alert-btn-full gold"
              onClick={() => {
                setShowSuccessPopup(false);
                setActiveMenu("Dashboard");
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
