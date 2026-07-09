import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {

  // admin
  


  // SCHEMES

  const cvy = await prisma.scheme.upsert({
    where: {
      code: "CVY",
    },
    update: {},
    create: {
      code: "CVY",
      name: "Skill Upgradation & Mahila Coir Yojana",
      description:
        "Training support for artisans and women entrepreneurs.",
    },
  });

  const st= await prisma.scheme.upsert({
    where: {
      code: "ST",
    },
    update: {},
    create: {
      code: "ST",
      name: "Science & Technology",
      description:
        "Supports research, innovation and technology adoption.",
    },
  });

  const dmp = await prisma.scheme.upsert({
    where: {
      code: "DMP",
    },
    update: {},
    create: {
      code: "DMP",
      name: "Domestic Market Promotion",
      description:
        "Promotional activities and domestic market support.",
    },
  });

  const emp = await prisma.scheme.upsert({
    where: {
      code: "EMP",
    },
    update: {},
    create: {
      code: "EMP",
      name: "Export Market Promotion",
      description:
        "Support for export and international promotion.",
    },
  });

  // TRAINING CENTRES

  const centres = [
    {
      name: "Alappuzha Training Centre",
      district: "Alappuzha",
      state: "Kerala",
      address: "Alappuzha, Kerala",
    },
    {
      name: "Thanjavur Training Centre",
      district: "Thanjavur",
      state: "Tamil Nadu",
      address: "Thanjavur, Tamil Nadu",
    },
    {
      name: "Bhubaneswar Training Centre",
      district: "Bhubaneswar",
      state: "Odisha",
      address: "Bhubaneswar, Odisha",
    },
    {
      name: "Rajahmundry Training Centre",
      district: "Rajahmundry",
      state: "Andhra Pradesh",
      address: "Rajahmundry, Andhra Pradesh",
    },
  ];

  for (const centre of centres) {
    const existing =
      await prisma.trainingCentre.findFirst({
        where: {
          name: centre.name,
        },
      });

    if (!existing) {
      await prisma.trainingCentre.create({
        data: centre,
      });
    }
  }

  // Programs

  const programs = [
    {
      title: "Diploma Course in Coir Technology",
      category: "Skill Training",
      duration: "1 Year + 3 Months Internship",
      benefit: "Stipend Support Available",
      level: "NSQF LEVEL-4",
    },
    {
      title: "Certificate Course of Coir Artisan",
      category: "Skill Training",
      duration: "6 Months + 1 Month Internship",
      benefit: "Full Grant Support",
      level: "NSQF LEVEL-3",
    },
    {
      title:
        "Training in Manufacturing of Value Added Products (VAP)",
      category: "Women Focused",
      duration: "2 Months",
      benefit: "Group Training (Min 20)",
    },
    {
      title: "Training in Spinning (MCY)",
      category: "Mahila Coir Yojana",
      duration: "2 Months",
      benefit: "Monthly Stipend ₹3000",
    },
    {
      title:
        "Entrepreneurship Development Programme (EDP)",
      category: "Promotional",
      duration: "3 Days Intensive",
      benefit: "Business Mentorship",
    },
    {
      title: "National Exposure Tour",
      category: "Promotional",
      duration: "5 Days",
      benefit: "Travel & Stay Supported",
    },
  ];

  await seedPrograms(cvy.id, programs);

  await seedPrograms(st.id, [
    {
      title:
        "Production Process Modernization Workshop",
      category: "Workshop",
      duration: "1-2 Weeks",
      benefit:
        "Advanced fibre extraction and processing training",
    },
    {
      title:
        "Quality Testing & Certification Course",
      category: "Certification",
      duration: "1 Week",
      benefit:
        "Quality standards and Eco-Mark certification",
    },
    {
      title:
        "Technology Upgradation Training",
      category: "Training",
      duration: "2 Weeks",
      benefit:
        "Modern coir technology training",
    },
  ]);

  await seedPrograms(dmp.id, [
    {
      title:
        "Domestic Exhibition Participation",
      category: "Exhibition",
      duration: "Event Based",
      benefit:
        "Subsidized participation in trade fairs",
    },
    {
      title:
        "Coir Product Branding & Publicity",
      category: "Marketing",
      duration: "Annual",
      benefit:
        "Brand promotion support",
    },
    {
      title:
        "Online Marketing Portal Training",
      category: "Digital Marketing",
      duration: "1 Week",
      benefit:
        "Online sales and marketing training",
    },
  ]);

  await seedPrograms(emp.id, [
    {
      title:
        "International Trade Fair Participation",
      category: "Export Promotion",
      duration: "Event Based",
      benefit:
        "International market exposure",
    },
    {
      title:
        "Export Sales-Cum-Study Tour",
      category: "Study Tour",
      duration: "Trip Based",
      benefit:
        "Export market development",
    },
    {
      title:
        "Export Quality Compliance Workshop",
      category: "Workshop",
      duration: "1 Week",
      benefit:
        "Training on export quality standards",
    },
  ]);

  // SEED INVENTORY
  const inventoryItems = [
    {
      name: "Premium Door Mat",
      sku: "COIR-MAT-001",
      category: "Mats & Rugs",
      quantity: 142,
      unit: "units",
      unitPrice: 450.0,
      stockStatus: "AVAILABLE",
      supplier: "Kerala Coir Crafts",
      image: "/assets/images/coir_door_mat.png",
    },
    {
      name: "Raw Brown Fiber",
      sku: "COIR-FIB-042",
      category: "Coir Fiber",
      quantity: 28,
      unit: "kg",
      unitPrice: 85.0,
      stockStatus: "LOW STOCK",
      supplier: "Alleppey Weaves",
      image: "/assets/images/coir_fiber.png",
    },
    {
      name: "3-Ply Coir Rope",
      sku: "COIR-ROP-081",
      category: "Coir Rope",
      quantity: 0,
      unit: "units",
      unitPrice: 120.0,
      stockStatus: "OUT OF STOCK",
      supplier: "Malabar Co-op",
      image: "/assets/images/coir_rope.png",
    },
    {
      name: "Erosion Control Mesh",
      sku: "COIR-GEO-210",
      category: "Geotextiles",
      quantity: 50,
      unit: "rolls",
      unitPrice: 2850.0,
      stockStatus: "AVAILABLE",
      supplier: "Southern Fibre Exporters",
      image: "/assets/images/coir_geotextile_mesh.png",
    },
    {
      name: "Rubberized Coir Pad",
      sku: "COIR-PAD-105",
      category: "Rubberized Mattresses",
      quantity: 600,
      unit: "units",
      unitPrice: 350.0,
      stockStatus: "AVAILABLE",
      supplier: "Malabar Weaves Ltd",
      image: "/assets/images/coir_fiber.png",
    },
    {
      name: "Curled Coir",
      sku: "COIR-FIB-012",
      category: "Coir Fiber",
      quantity: 110,
      unit: "kg",
      unitPrice: 84.0,
      stockStatus: "LOW STOCK",
      supplier: "Kerala Coir Crafts",
      image: "/assets/images/coir_rope.png",
    },
  ];

  for (const item of inventoryItems) {
    await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: {},
      create: item,
    });
  }

  // SEED SUPPLIERS
  const seedSuppliers = [
    {
      id: "sup-1",
      name: "Kerala Coir Crafts",
      rating: 4.8,
      stars: 5,
      availability: "IN STOCK",
      stock: 3200,
      fulfillment: "12 Days",
      base: 150.0,
      trans: 15.0,
      tax: 20.0,
      total: 185.0,
    },
    {
      id: "sup-2",
      name: "Alleppey Weaves",
      rating: 4.2,
      stars: 4,
      availability: "IN STOCK",
      stock: 1850,
      fulfillment: "18 Days",
      base: 145.0,
      trans: 10.0,
      tax: 17.0,
      total: 172.0,
    },
    {
      id: "sup-3",
      name: "Malabar Co-op",
      rating: 3.5,
      stars: 3,
      availability: "LIMITED",
      stock: 400,
      fulfillment: "25 Days",
      base: 145.0,
      trans: 10.0,
      tax: 17.0,
      total: 172.0,
    },
    {
      id: "sup-4",
      name: "Southern Fibre Exporters",
      rating: 2.5,
      stars: 3,
      availability: "LIMITED",
      stock: 100,
      fulfillment: "28 Days",
      base: 420.0,
      trans: 45.0,
      tax: 55.0,
      total: 520.0,
    },
    {
      id: "sup-5",
      name: "Malabar Weaves Ltd",
      rating: 2.0,
      stars: 2,
      availability: "LIMITED",
      stock: 50,
      fulfillment: "30 Days",
      base: 380.0,
      trans: 90.0,
      tax: 45.0,
      total: 515.0,
    },
  ];

  for (const sup of seedSuppliers) {
    await prisma.supplier.upsert({
      where: { id: sup.id },
      update: {},
      create: sup,
    });
  }

  // SEED DEMANDS
  const seedDemands = [
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
      productName: "Curled Coir Rope",
      dateText: "Raised 29 Mar, 2026",
      qty: "1,500 kg",
      status: "SUBMITTED",
    },
  ];

  for (const dem of seedDemands) {
    await prisma.demand.upsert({
      where: { id: dem.id },
      update: {},
      create: dem,
    });
  }

  // SEED SUPPLIER RESPONSES
  const seedResponses = [
    { demandId: "DEM-2026-089", supplierId: "sup-1", base: 150.0, trans: 15.0, tax: 20.0, total: 185.0 },
    { demandId: "DEM-2026-089", supplierId: "sup-2", base: 145.0, trans: 10.0, tax: 17.0, total: 172.0 },
    { demandId: "DEM-2026-089", supplierId: "sup-3", base: 145.0, trans: 10.0, tax: 17.0, total: 172.0 },
    { demandId: "DEM-2026-089", supplierId: "sup-4", base: 420.0, trans: 45.0, tax: 55.0, total: 520.0 },
    { demandId: "DEM-2026-089", supplierId: "sup-5", base: 380.0, trans: 90.0, tax: 45.0, total: 515.0 },
  ];

  for (const resp of seedResponses) {
    await prisma.supplierResponse.upsert({
      where: {
        demandId_supplierId: {
          demandId: resp.demandId,
          supplierId: resp.supplierId,
        },
      },
      update: {},
      create: resp,
    });
  }
  
  console.log("✅ Seed completed");
}

async function seedPrograms(
  schemeId: number,
  programs: any[],
) {
  for (const program of programs) {
    const existing =
      await prisma.program.findFirst({
        where: {
          title: program.title,
          schemeId,
        },
      });

    if (!existing) {
      await prisma.program.create({
        data: {
          ...program,
          schemeId,
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });