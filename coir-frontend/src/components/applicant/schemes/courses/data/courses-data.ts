import type { Course } from "../types/course.type";

export const courses: Course[] = [
  {
    id: "diploma-coir-tech",
    schemeId: "cvy",
    title: "Diploma Course in Coir Technology",
    category: "Skill Training",
    duration: "1 Year + 3 Months Internship",
    benefit: "Stipend Support Available",
    level: "NSQF LEVEL-4",
    tags: ["Diploma", "Internship"],
    image: "/assets/images/course-1.png",
  },

  {
    id: "certificate-artisan",
    schemeId: "cvy",
    title: "Certificate Course of Coir Artisan",
    category: "Skill Training",
    duration: "6 Months + 1 Month Internship",
    benefit: "Full Grant Support",
    level: "NSQF LEVEL-3",
    tags: ["Certificate"],
    image: "/assets/images/course-2.png",
  },

  {
    id: "vap-training",
    schemeId: "cvy",
    title:
      "Training in Manufacturing of Value Added Products (VAP)",
    category: "Women Focused",
    duration: "2 Months",
    benefit: "Group Training (Min 20)",
    tags: ["Women", "VAP"],
    image: "/assets/images/course-3.png",
  },

  {
    id: "spinning-training",
    schemeId: "cvy",
    title: "Training in Spinning (MCY)",
    category: "Mahila Coir Yojana",
    duration: "2 Months",
    benefit: "Monthly Stipend ₹3000",
    tags: ["MCY"],
    image: "/assets/images/course-4.png",
  },

  {
    id: "edp",
    schemeId: "cvy",
    title:
      "Entrepreneurship Development Programme (EDP)",
    category: "Promotional",
    duration: "3 Days Intensive",
    benefit: "Business Mentorship",
    tags: ["EDP"],
    image: "/assets/images/course-5.png",
  },

  {
    id: "national-exposure",
    schemeId: "cvy",
    title: "National Exposure Tour",
    category: "Promotional",
    duration: "5 Days",
    benefit: "Travel & Stay Supported",
    tags: ["Exposure"],
    image: "/assets/images/course-6.png",
  },
];