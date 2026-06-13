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

  await prisma.scheme.upsert({
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

  await prisma.scheme.upsert({
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

  await prisma.scheme.upsert({
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

  // COURSES

  const courses = [
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

  for (const course of courses) {
    const existing =
      await prisma.course.findFirst({
        where: {
          title: course.title,
          schemeId: cvy.id,
        },
      });

    if (!existing) {
      await prisma.course.create({
        data: {
          ...course,
          schemeId: cvy.id,
        },
      });
    }
  }

  console.log("✅ Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });