export type ProjectStatus =
  | "Enrolling"
  | "Interest List Open"
  | "Coming Soon"
  | "In Development"
  | "Waitlist"
  | "Seasonal Program";

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectFeature = {
  title: string;
  description: string;
  status?: "Core" | "Coming Soon" | "In Development";
};

export type ProjectFaq = {
  question: string;
  answer: string;
};

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tags: string[];
  tagline: string;
  description: string;
  mission: string;
  why: string;
  audience: string[];
  features: ProjectFeature[];
  experienceLabel: string;
  experience: { title: string; description: string }[];
  outcomes: string[];
  whatToExpect: string[];
  quickFacts: ProjectFact[];
  faqs: ProjectFaq[];
  status: ProjectStatus;
  image: string;
  imageAlt: string;
  accent: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
};

const placeholder = "[Details to be confirmed]";

export const projects: Project[] = [
  {
    slug: "creekside-warriors",
    name: "Creekside Warriors Student Athlete Academy",
    shortName: "Creekside Warriors",
    category: "Student Athlete Development",
    tags: ["Student Athletes", "Academics", "Mentorship", "Athletic Development"],
    tagline: "Building Strong Students. Building Strong Athletes. Building Strong Futures.",
    description:
      "A small-cohort student-athlete development program combining academics, athletic preparation, mentorship, accountability, and high-school readiness.",
    mission:
      "Creekside Warriors is designed for young athletes who need an environment that develops the student and the athlete together. The program brings personalized academics, athletic preparation, mentorship, accountability, and leadership development into one supportive learning experience.",
    why:
      "Athletic ability can open doors, but education gives young people the ability to walk through those doors prepared. Creekside intentionally develops students academically alongside their athletic growth, helping them build habits and confidence for the next level.",
    audience: [
      "Middle school student-athletes",
      "Students preparing for high-school athletics",
      "Athletes considering a different academic pathway",
      "Families seeking a small-cohort learning environment",
      "Students who benefit from additional academic structure",
      "Young people balancing academics and competitive athletics",
    ],
    features: [
      {
        title: "Academic Development",
        description:
          "Individualized instruction and academic support focused on stronger secondary-school performance.",
      },
      {
        title: "Mathematics",
        description:
          "Foundational skills, pre-algebra, algebra readiness, and problem solving connected to real goals.",
      },
      {
        title: "Language Arts",
        description:
          "Reading, writing, communication, vocabulary, literary analysis, and academic expression.",
      },
      {
        title: "Athletic Development",
        description:
          "Age-appropriate conditioning, athletic fundamentals, sports preparation, and accountability.",
      },
      {
        title: "Mentorship",
        description:
          "Guidance around habits, discipline, confidence, decision-making, and personal responsibility.",
      },
      {
        title: "High-School Readiness",
        description:
          "Preparation for the academic, social, and athletic expectations students encounter in high school.",
      },
    ],
    experienceLabel: "Example Program Flow",
    experience: [
      { title: "Academic Check-In", description: "Set goals and identify the day's learning focus." },
      { title: "Mathematics and Language Arts", description: "Build core skills through focused instruction." },
      { title: "Independent Work or Project Learning", description: "Practice ownership, research, and follow-through." },
      { title: "Break and Community Time", description: "Reset, connect, and refuel." },
      { title: "Athletic Development", description: "Work on fundamentals, movement, and preparation." },
      { title: "Mentoring and Goal Setting", description: "Reflect on progress and identify the next step." },
    ],
    outcomes: [
      "Stronger academic habits and self-advocacy",
      "More confidence navigating school expectations",
      "Improved communication and accountability",
      "A clearer connection between daily practice and long-term goals",
      "Preparation for increasingly competitive learning and athletic environments",
    ],
    whatToExpect: [
      "Small learning communities where relationships matter",
      "Student-first support that recognizes the whole person",
      "Clear expectations paired with encouragement",
      "Academic and athletic growth developed side by side",
    ],
    quickFacts: [
      { label: "Grades / Ages", value: placeholder },
      { label: "Location", value: placeholder },
      { label: "Program Days", value: placeholder },
      { label: "Program Hours", value: placeholder },
      { label: "Tuition", value: placeholder },
      { label: "Cohort Size", value: "Small cohort" },
      { label: "Enrollment Status", value: "Interest list open" },
    ],
    faqs: [
      {
        question: "Who is Creekside Warriors for?",
        answer:
          "The program is designed for student-athletes and families looking for academic structure, athletic development, mentorship, and preparation for the transition to high school.",
      },
      {
        question: "Is Creekside a school?",
        answer:
          "Creekside Warriors is an educational and youth-development program. Program details and delivery format are still being finalized.",
      },
      {
        question: "Does Creekside guarantee scholarships or recruitment?",
        answer:
          "No. Creekside focuses on student development and preparation. It does not guarantee scholarships, recruitment, admissions, or athletic outcomes.",
      },
      {
        question: "How can I learn more?",
        answer:
          "Join the interest list below. A member of the We Grow Kids team will follow up with current program information as details are confirmed.",
      },
    ],
    status: "Interest List Open",
    image: "/src/assets/tutoring-session.png",
    imageAlt: "Students learning together in a focused small-group setting",
    accent: "from-[#163d2a] via-[#285735] to-[#a86f2d]",
    ctaLabel: "Join the Interest List",
    ctaHref: "#creekside-interest",
    metaTitle: "Creekside Warriors Student Athlete Academy | We Grow Kids",
    metaDescription:
      "Explore Creekside Warriors, a student-athlete development program combining academics, athletic preparation, mentorship, and high-school readiness.",
  },
  {
    slug: "afrofuturism-discovery-academy",
    name: "Afrofuturism Discovery Academy",
    shortName: "Afrofuturism Discovery Academy",
    category: "Interdisciplinary Learning",
    tags: ["Afrofuturism", "STEAM", "Math", "Literacy", "Innovation"],
    tagline: "Imagine the Future. Understand the Past. Build What Comes Next.",
    description:
      "An innovative learning community where students explore mathematics, literacy, STEAM, history, communication, aviation, invention, and African diasporic achievement through an Afrofuturist lens.",
    mission:
      "Afrofuturism Discovery Academy connects academic growth with imagination, invention, African and African diasporic history, STEAM, communication, storytelling, and future-focused problem solving. Students are invited not only to study the world, but to imagine how they can shape it.",
    why:
      "Young people deserve learning environments that make room for cultural knowledge, rigorous academics, creative questions, and bold possibilities. This academy creates those connections across subjects instead of asking students to keep every idea in a separate box.",
    audience: [
      "Elementary and middle-grade learners",
      "Home-learning families seeking enrichment",
      "Students interested in STEAM and invention",
      "Curious and creative learners",
      "Students who benefit from culturally responsive learning",
      "Families seeking an educational community",
    ],
    features: [
      { title: "Afro-Algebra", description: "Mathematical reasoning connected to history, culture, patterns, and real-world problem solving." },
      { title: "Afrofuturism Is Lit", description: "Reading, writing, storytelling, and literary exploration through imaginative and culturally grounded texts." },
      { title: "FutureScope STEAM", description: "Science, technology, engineering, art, and mathematics brought together through design challenges." },
      { title: "Aviation", description: "Exploration of flight, navigation, engineering, and the people who expanded what was possible." },
      { title: "SPEC Crew", description: "Communication, collaboration, creative thinking, and community-centered project work." },
      { title: "History and Cultural Exploration", description: "African and African diasporic achievement, invention, movement, and cultural memory." },
      { title: "Limitless Lab", description: "A space for questions, prototypes, experiments, and ideas that are still becoming." },
      { title: "Student Projects and Showcases", description: "Opportunities to make, explain, share, and celebrate learning." },
    ],
    experienceLabel: "Sample Learning Week",
    experience: [
      { title: "Mathematics", description: "Investigate patterns, models, and problems with cultural and real-world context." },
      { title: "Literacy", description: "Read, discuss, write, and imagine through powerful stories and ideas." },
      { title: "Community and Communication", description: "Practice collaboration, presentation, listening, and shared problem solving." },
      { title: "STEAM and Aviation", description: "Design, test, revise, and connect science to invention." },
      { title: "Projects and Showcase", description: "Reflect on the work and share a developing idea with others." },
    ],
    outcomes: [
      "Mathematical reasoning and scientific thinking",
      "Reading comprehension, writing, and communication",
      "Research, creativity, and collaboration",
      "Cultural knowledge and digital literacy",
      "Presentation skills and confidence as a learner",
    ],
    whatToExpect: [
      "Learning that connects disciplines instead of isolating them",
      "Space for imagination, questions, and student voice",
      "Culturally responsive content and community",
      "Projects that move from idea to prototype to explanation",
    ],
    quickFacts: [
      { label: "Grade Range", value: placeholder },
      { label: "Format", value: placeholder },
      { label: "Schedule", value: placeholder },
      { label: "Tuition", value: placeholder },
      { label: "Enrollment Status", value: "In development" },
    ],
    faqs: [
      {
        question: "What does Afrofuturism mean in this program?",
        answer:
          "Here, Afrofuturism is a lens for connecting African and diasporic history, culture, imagination, technology, and future-building with meaningful academic learning.",
      },
      {
        question: "Is this a school?",
        answer:
          "The Academy is being developed as an interdisciplinary educational experience and learning community. Program details are still being finalized.",
      },
      {
        question: "What ages can participate?",
        answer:
          "The current grade range is being confirmed. Join the interest list or contact We Grow Kids for updates.",
      },
    ],
    status: "In Development",
    image: "/src/assets/afrofuturism.png",
    imageAlt: "Afrofuturist educational artwork representing imagination and discovery",
    accent: "from-[#30204c] via-[#533274] to-[#b8782d]",
    ctaLabel: "Join the Interest List",
    ctaHref: "/contact",
    metaTitle: "Afrofuturism Discovery Academy | We Grow Kids",
    metaDescription:
      "Discover an interdisciplinary learning experience connecting STEAM, literacy, history, invention, and African diasporic achievement through an Afrofuturist lens.",
  },
  {
    slug: "virtual-villages",
    name: "Virtual Villages",
    shortName: "Virtual Villages",
    category: "Online Learning Community",
    tags: ["Virtual Learning", "Family Resources", "Tutoring", "Community"],
    tagline: "Learning Shouldn't Depend on Your Zip Code.",
    description:
      "A one-stop online hub in development to connect families in Santa Clara County with educational resources, support, enrichment, and community.",
    mission:
      "Virtual Villages is the online community and educational-support side of We Grow Kids. It is being designed as a digital village where families can find tutoring, enrichment, mentoring, resources, and live learning experiences in one welcoming place.",
    why:
      "Families should not have to navigate disconnected resources alone. Virtual Villages will make it easier to discover support, understand available opportunities, and build relationships with educators, mentors, and other learners.",
    audience: [
      "Families seeking educational resources in Santa Clara County",
      "Students needing tutoring or enrichment",
      "Home-learning families",
      "Families seeking flexible learning options",
      "Educators, mentors, and community partners",
      "Organizations building small learning communities",
    ],
    features: [
      { title: "Live Tutoring", description: "One-on-one and small-group academic support.", status: "In Development" },
      { title: "Small-Group Learning", description: "Shared learning experiences built around connection and participation.", status: "In Development" },
      { title: "Family Resources", description: "A clearer starting point for families looking for educational support.", status: "In Development" },
      { title: "Virtual Clubs", description: "Interest-based spaces for learners to connect and create.", status: "Coming Soon" },
      { title: "Mentorship", description: "Relationships with caring educators and community guides.", status: "Coming Soon" },
      { title: "Project-Based Learning", description: "Opportunities to learn by making, researching, and sharing.", status: "Coming Soon" },
      { title: "Community Events", description: "Online and local opportunities to learn together.", status: "Coming Soon" },
      { title: "Guest Educators", description: "Connections to people bringing knowledge and lived experience.", status: "Coming Soon" },
    ],
    experienceLabel: "How It Works",
    experience: [
      { title: "Join the Village", description: "Register interest and tell us what kind of support you are looking for." },
      { title: "Choose Support", description: "Explore tutoring, classes, projects, resources, or community experiences." },
      { title: "Learn Together", description: "Participate in flexible learning experiences with other families and learners." },
      { title: "Grow Your Learning Network", description: "Build relationships with educators, mentors, and community partners." },
    ],
    outcomes: [
      "A clearer path to educational support",
      "More flexible ways to connect with learning",
      "Stronger relationships among families, educators, and mentors",
      "A growing network of trusted community opportunities",
    ],
    whatToExpect: [
      "A human-centered digital experience, not just a list of links",
      "Clear labels for what is active, coming soon, or in development",
      "Flexible pathways for families with different needs",
      "A community that can grow with the people using it",
    ],
    quickFacts: [
      { label: "Service Area", value: "Santa Clara County and online" },
      { label: "Launch Date", value: placeholder },
      { label: "Membership", value: placeholder },
      { label: "Pricing", value: placeholder },
      { label: "Available Services", value: "In development" },
    ],
    faqs: [
      {
        question: "Is Virtual Villages available now?",
        answer:
          "Virtual Villages is currently in development. Some connected We Grow Kids services are available now; other resources will be introduced as the hub grows.",
      },
      {
        question: "Who is Virtual Villages for?",
        answer:
          "The hub is being designed for families, students, educators, mentors, and community partners seeking flexible educational support and connection.",
      },
      {
        question: "How can my organization contribute?",
        answer:
          "Use the contact link to tell We Grow Kids about your organization, resource, or partnership idea.",
      },
    ],
    status: "In Development",
    image: "/src/assets/hero-learning.png",
    imageAlt: "Learners connecting through a warm, collaborative educational experience",
    accent: "from-[#163d2a] via-[#2b6b63] to-[#7f9c63]",
    ctaLabel: "Find Your Village",
    ctaHref: "/contact",
    metaTitle: "Virtual Villages | We Grow Kids",
    metaDescription:
      "Virtual Villages is a We Grow Kids project building a one-stop online hub for educational resources and community support in Santa Clara County.",
  },
  {
    slug: "friday-farm",
    name: "Friday Farm",
    shortName: "Friday Farm",
    category: "Outdoor Learning",
    tags: ["Outdoor Learning", "Agriculture", "STEAM", "Community", "Nature"],
    tagline: "Get Outside. Get Curious. Grow Something.",
    description:
      "A recurring outdoor learning experience where children connect nature, agriculture, science, art, community, play, and hands-on discovery.",
    mission:
      "Friday Farm is designed to make nature a classroom. Through gardening, farm exploration, science, creativity, physical activity, and community, learners can build knowledge by observing, making, moving, and caring for the world around them.",
    why:
      "Learning does not only happen at a desk. Outdoor experiences give children room to ask questions, notice patterns, work with their hands, and connect academic ideas to living systems and one another.",
    audience: [
      "Families seeking outdoor learning",
      "Elementary and middle-grade learners",
      "Home-learning families",
      "Children who thrive through hands-on experiences",
      "Families seeking community and nature connection",
    ],
    features: [
      { title: "Gardening and Plant Science", description: "Explore seeds, soil, growth, food systems, and seasonal change." },
      { title: "Environmental Science", description: "Notice ecosystems, water, weather, habitats, and stewardship." },
      { title: "Outdoor Art", description: "Use observation and natural materials as starting points for creative work." },
      { title: "Nature Journaling", description: "Record questions, sketches, measurements, and discoveries." },
      { title: "STEAM Challenges", description: "Design, build, test, and revise outside the traditional classroom." },
      { title: "Community Building", description: "Learn through shared work, play, conversation, and reflection." },
    ],
    experienceLabel: "Sample Experience",
    experience: [
      { title: "Welcome and Free Exploration", description: "Arrive, reconnect, play, and notice what is happening around you." },
      { title: "Farm Discovery", description: "Explore plants, animals, soil, water, or another natural system." },
      { title: "Hands-On Learning", description: "Try a science, gardening, art, engineering, or environmental activity." },
      { title: "Community Meal or Lunch", description: "Share food and conversation when the experience includes a meal." },
      { title: "Creative Project", description: "Paint, journal, build, design, or make something from the day's questions." },
      { title: "Closing Circle", description: "Reflect, share, and preview the next experience." },
    ],
    outcomes: [
      "Stronger observation, questioning, and scientific thinking",
      "Connections between outdoor experiences and academic ideas",
      "Practice with collaboration, responsibility, and care",
      "More confidence learning through movement and making",
    ],
    whatToExpect: [
      "Nature and the farm as living learning environments",
      "Hands-on activities with room for curiosity",
      "A balance of exploration, structure, and reflection",
      "A welcoming community experience for families and learners",
    ],
    quickFacts: [
      { label: "Ages", value: placeholder },
      { label: "Location", value: placeholder },
      { label: "Schedule", value: placeholder },
      { label: "Cost", value: placeholder },
      { label: "Parent Participation", value: placeholder },
      { label: "Enrollment Status", value: "Seasonal details to be confirmed" },
    ],
    faqs: [
      {
        question: "Is Friday Farm the same as Friday Garden Lab?",
        answer:
          "Friday Farm is being presented as a separate We Grow Kids project for now. The existing Friday Garden Lab page remains available while the relationship between the two experiences is considered.",
      },
      {
        question: "What ages can participate?",
        answer:
          "Exact ages are still being confirmed. Join the interest list to receive updated information.",
      },
      {
        question: "Where does Friday Farm meet?",
        answer:
          "The location is still being finalized. Confirmed details will be shared before registration opens.",
      },
    ],
    status: "Seasonal Program",
    image: "/src/assets/gardening-class.png",
    imageAlt: "Children exploring a hands-on garden learning experience",
    accent: "from-[#214e2d] via-[#5e7e36] to-[#c28a3b]",
    ctaLabel: "Join the Friday Farm List",
    ctaHref: "/contact",
    metaTitle: "Friday Farm | We Grow Kids",
    metaDescription:
      "Explore Friday Farm, a We Grow Kids outdoor learning project connecting nature, agriculture, science, art, and community.",
  },
];

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}