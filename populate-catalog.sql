-- Populate Vidya Course Catalog

-- Helper to generate slug if needed (though we'll specify them)
-- CREATE OR REPLACE FUNCTION vidya.slugify(title text) RETURNS text AS $$ ... $$ LANGUAGE sql;

-- 1. CS Fundamentals
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('data-structures-algorithms', 'Data Structures & Algorithms (DSA)', 'Master the core concepts of DSA for technical interviews and efficient problem solving.', 'CS Fundamentals', 0, true),
('operating-systems', 'Operating Systems (OS)', 'Learn about process management, memory allocation, file systems, and more.', 'CS Fundamentals', 0, true),
('database-management-systems', 'Database Management Systems (DBMS)', 'Fundamentals of relational databases, SQL, and database design.', 'CS Fundamentals', 0, true),
('computer-networks', 'Computer Networks (CN)', 'Understanding OSI layers, TCP/IP, and networking protocols.', 'CS Fundamentals', 0, true),
('computer-organization-architecture', 'Computer Organization & Architecture (COA)', 'Internal working of computers, CPU design, and memory hierarchy.', 'CS Fundamentals', 0, true),
('theory-of-computation', 'Theory of Computation (TOC)', 'Automata theory, formal languages, and computability.', 'CS Fundamentals', 0, true),
('discrete-mathematics-for-engineers', 'Discrete Mathematics for Engineers', 'Mathematical foundations for computer science including logic and set theory.', 'CS Fundamentals', 0, true),
('compiler-design-internals', 'Compiler Design & Internals', 'How compilers translate high-level languages to machine code.', 'CS Fundamentals', 0, true),
('software-engineering-sdlc', 'Software Engineering & SDLC', 'Principles of software development, methodologies, and life cycles.', 'CS Fundamentals', 0, true),
('digital-logic-circuit-design', 'Digital Logic & Circuit Design', 'Foundations of digital electronics and circuit design.', 'CS Fundamentals', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 2. Programming
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('c-programming-masterclass', 'C Programming Masterclass: The Logic Foundation', 'Build a strong logical foundation with the C programming language.', 'Programming', 0, true),
('cpp-stl-competitive-programming', 'C++ with STL: Competitive Programming Edition', 'Master C++ and STL for competitive programming and coding contests.', 'Programming', 0, true),
('java-masterclass-core-to-advanced', 'Java Masterclass: Core to Advanced', 'Complete Java course from basics to advanced enterprise concepts.', 'Programming', 0, true),
('python-zero-to-hero', 'Python Zero to Hero: Scripting & Automation', 'Learn Python for scripting, automation, and general-purpose programming.', 'Programming', 0, true),
('csharp-net-core', 'C# .NET Core for Enterprise Applications', 'Building robust enterprise applications with C# and .NET Core.', 'Programming', 0, true),
('golang-high-performance-systems', 'Golang: High-Performance Systems', 'Master Go for building scalable and high-performance backend systems.', 'Programming', 0, true),
('rust-modern-systems-programming', 'Rust: Modern Systems Programming', 'Deep dive into Rust for safe and concurrent systems programming.', 'Programming', 0, true),
('r-for-statistical-computing', 'R for Statistical Computing & Data Science', 'Use R for data analysis, visualization, and statistical computing.', 'Programming', 0, true),
('typescript-professional-typing', 'TypeScript: Professional Level Typing', 'Enhance your JavaScript with strong typing and modern features.', 'Programming', 0, true),
('object-oriented-programming-java', 'Object-Oriented Programming (OOPs) in Java', 'Core OOP concepts implemented in Java.', 'Programming', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 3. Web Development
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('html5-semantic-web', 'HTML5 & Semantic Web: The Front-End Base', 'Master the building blocks of the web with modern HTML5.', 'Web Development', 0, true),
('css3-tailwind-modern-styling', 'CSS3 & Tailwind: Modern Styling Systems', 'Learn advanced CSS and Tailwind CSS for beautiful, responsive designs.', 'Web Development', 0, true),
('javascript-deep-dive-es6', 'JavaScript Deep Dive: ES6+ and Beyond', 'Master the language of the web with deep dives into ES6+ features.', 'Web Development', 0, true),
('reactjs-hooked-modern-ui', 'React.js Hooked: Modern UI Patterns', 'Build dynamic user interfaces with React and modern hooks.', 'Web Development', 0, true),
('nextjs-15-full-stack', 'Next.js 15 Full Stack: The Unified Ecosystem', 'Complete guide to Next.js 15 for full-stack web development.', 'Web Development', 0, true),
('vuejs-nuxt-progressive', 'Vue.js & Nuxt: The Progressive Path', 'Building fast and reliable apps with Vue.js and Nuxt.', 'Web Development', 0, true),
('nodejs-express-scalability', 'Node.js & Express: Backend Scalability', 'Master backend development with Node.js and Express.', 'Web Development', 0, true),
('nestjs-enterprise-node', 'NestJS: Enterprise-Grade Node.js', 'Build scalable enterprise-grade applications with NestJS.', 'Web Development', 0, true),
('graphql-apollo-api-design', 'GraphQL & Apollo: Modern API Design', 'Next-gen API design with GraphQL and Apollo.', 'Web Development', 0, true),
('frontend-system-design', 'Frontend System Design: Scaling UI', 'Architectural patterns for large-scale frontend applications.', 'Web Development', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 4. AI & GenAI
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('build-genai-saas-7-days', 'Build a GenAI SaaS in 7 Days (Next.js + Gemini)', 'Learn to build and deploy a generative AI SaaS application.', 'AI & GenAI', 0, true),
('ai-assisted-engineering-cursor-v0', 'AI-Assisted Engineering with Cursor & v0', 'Boost productivity with AI-powered development tools.', 'AI & GenAI', 0, true),
('rag-architect-knowledge-aware-bots', 'RAG Architect: Building Knowledge-Aware Bots', 'Implement Retrieval-Augmented Generation for intelligent bots.', 'AI & GenAI', 0, true),
('prompt-engineering-for-engineers', 'Prompt Engineering for Software Engineers', 'Master the art of prompt engineering for LLMs.', 'AI & GenAI', 0, true),
('autonomous-ai-agents-langchain', 'Autonomous AI Agents with LangChain', 'Build agents that can perform tasks autonomously using LangChain.', 'AI & GenAI', 0, true),
('vector-databases-mastery', 'Vector Databases Mastery (Pinecone/Supabase)', 'Learn about vector storage and retrieval for AI apps.', 'AI & GenAI', 0, true),
('fine-tuning-llms', 'Fine-Tuning LLMs: Custom Job Bot training', 'How to fine-tune large language models for specific tasks.', 'AI & GenAI', 0, true),
('python-for-generative-ai', 'Python for Generative AI & LLM Apps', 'Python essentials for building AI-driven applications.', 'AI & GenAI', 0, true),
('low-code-to-pro-code-prototyping', 'Low-Code to Pro-Code: Rapid Prototyping', 'Bridging the gap between low-code and professional development.', 'AI & GenAI', 0, true),
('multi-agent-systems-orchestrating-ai', 'Multi-Agent Systems: Orchestrating AI', 'Designing and managing systems with multiple AI agents.', 'AI & GenAI', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 5. Data Science
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('statistics-probability-data-science', 'Statistics & Probability for Data Science', 'Essential math for data analysis and machine learning.', 'Data Science', 0, true),
('sql-mastery-advanced-queries', 'SQL Mastery: Advanced Queries & Joins', 'Deep dive into complex SQL queries and optimization.', 'Data Science', 0, true),
('data-visualization-powerbi-tableau', 'Data Visualization with Power BI & Tableau', 'Visualizing data effectively using industry-standard tools.', 'Data Science', 0, true),
('pandas-numpy-data-analysis', 'Pandas & NumPy: Data Analysis in Python', 'Fundamental libraries for data manipulation in Python.', 'Data Science', 0, true),
('machine-learning-fundamentals', 'Machine Learning Fundamentals: Scikit-Learn', 'Basics of ML algorithms and implementation.', 'Data Science', 0, true),
('deep-learning-tensorflow-pytorch', 'Deep Learning with TensorFlow & PyTorch', 'Building neural networks for complex tasks.', 'Data Science', 0, true),
('big-data-systems-spark-hadoop', 'Big Data Systems: Spark & Hadoop', 'Processing large-scale datasets efficiently.', 'Data Science', 0, true),
('data-engineering-pipelines-etl', 'Data Engineering Pipelines (ETL)', 'Designing and building data pipelines.', 'Data Science', 0, true),
('predictive-modeling-job-markets', 'Predictive Modeling for Job Markets', 'Applying data science to predict workforce trends.', 'Data Science', 0, true),
('natural-language-processing-nlp', 'Natural Language Processing (NLP)', 'Deep dive into processing and understanding human language.', 'Data Science', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 6. Cloud & DevOps
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('aws-certified-solutions-architect', 'AWS Certified Solutions Architect Training', 'Comprehensive guide to AWS cloud architecture.', 'Cloud & DevOps', 0, true),
('docker-containerization-developers', 'Docker Containerization for Developers', 'Mastering Docker for application packaging and deployment.', 'Cloud & DevOps', 0, true),
('kubernetes-orchestration-scale', 'Kubernetes: Orchestration at Scale', 'Managing containerized applications with K8s.', 'Cloud & DevOps', 0, true),
('cicd-pipelines-github-actions', 'CI/CD Pipelines with GitHub Actions', 'Automating software delivery with GitHub Actions.', 'Cloud & DevOps', 0, true),
('infrastructure-as-code-terraform-ansible', 'Infrastructure as Code (Terraform & Ansible)', 'Managing infrastructure using code.', 'Cloud & DevOps', 0, true),
('linux-administration-developers', 'Linux Administration for Developers', 'Essential Linux skills for modern developers.', 'Cloud & DevOps', 0, true),
('serverless-computing-aws-lambda', 'Serverless Computing with AWS Lambda', 'Building applications without managing servers.', 'Cloud & DevOps', 0, true),
('monitoring-logging-grafana-elk', 'Monitoring & Logging (Grafana & ELK)', 'Observability in modern software systems.', 'Cloud & DevOps', 0, true),
('gcp-fundamentals', 'Google Cloud Platform (GCP) Fundamentals', 'Getting started with Google Cloud services.', 'Cloud & DevOps', 0, true),
('azure-cloud-architect-path', 'Azure Cloud Architect Path', 'Mastering Microsoft Azure for cloud solutions.', 'Cloud & DevOps', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 7. Mobile Dev
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('android-app-development-kotlin', 'Android App Development with Kotlin', 'Build modern Android apps using Kotlin.', 'Mobile Dev', 0, true),
('ios-app-development-swift', 'iOS App Development with Swift', 'Master iOS development with Swift and Xcode.', 'Mobile Dev', 0, true),
('flutter-hybrid-codebase', 'Flutter Hybrid: One Codebase for All', 'Build cross-platform apps for mobile, web, and desktop.', 'Mobile Dev', 0, true),
('react-native-mobile-apps', 'React Native: Mobile Apps with React', 'Using React to build native mobile applications.', 'Mobile Dev', 0, true),
('mobile-ui-ux-design-fundamentals', 'Mobile UI/UX Design Fundamentals', 'Designing user-friendly mobile interfaces.', 'Mobile Dev', 0, true),
('app-store-optimization-deployment', 'App Store Optimization & Deployment', 'Strategies for publishing and promoting your apps.', 'Mobile Dev', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 8. Cybersecurity
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('ethical-hacking-penetration-testing', 'Ethical Hacking & Penetration Testing', 'Learn the basics of cybersecurity and ethical hacking.', 'Cybersecurity', 0, true),
('network-security-cryptography', 'Network Security & Cryptography', 'Securing communications and data.', 'Cybersecurity', 0, true),
('web-application-security-owasp', 'Web Application Security (OWASP Top 10)', 'Defending web applications against common attacks.', 'Cybersecurity', 0, true),
('cloud-security-governance', 'Cloud Security & Governance', 'Securing cloud environments and compliance.', 'Cybersecurity', 0, true),
('incident-response-digital-forensics', 'Incident Response & Digital Forensics', 'Handling security breaches and investigating digital evidence.', 'Cybersecurity', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 9. Career & Productivity
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('hinglish-interview-technical-prep', 'The Hinglish Interview: Technical Prep', 'Master your technical interviews with concepts explained in Hinglish.', 'Career & Productivity', 0, true),
('github-portfolio-job-seekers', 'GitHub Portfolio for Job Seekers', 'How to build a compelling GitHub portfolio to get hired.', 'Career & Productivity', 0, true),
('freelance-fundas-global-clients', 'Freelance Fundas: Finding Global Clients', 'Start your freelancing career and find international clients.', 'Career & Productivity', 0, true),
('startup-mvp-production-30-days', 'Startup MVP: 0 to Production in 30 Days', 'Building and launching a Minimum Viable Product quickly.', 'Career & Productivity', 0, true),
('aptitude-for-tech-bridge', 'Aptitude for Tech: SSC to SDE Bridge', 'Transitioning from generic aptitude to software engineering requirements.', 'Career & Productivity', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 10. Game Development (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('unity-game-dev-starter', 'Unity Game Dev Starter', 'Duration: 5 months, Level: Beginner. Path: C# Basics -> Unity Interface -> 2D Games -> 3D Games -> Publishing.', 'Game Development', 0, true),
('mobile-game-developer', 'Mobile Game Developer', 'Duration: 4 months, Level: Intermediate. Path: Unity for Mobile -> Monetization -> Ad Integration -> Play Store -> Analytics.', 'Game Development', 0, true),
('unreal-engine-pro', 'Unreal Engine Pro', 'Duration: 6 months, Level: Advanced. Path: Blueprints -> C++ -> Level Design -> Lighting -> VFX -> Packaging.', 'Game Development', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 11. Data Engineering (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('big-data-engineer', 'Big Data Engineer', 'Duration: 6 months, Level: Intermediate. Path: Hadoop -> Spark -> Kafka -> Airflow -> Snowflake -> ETL Pipelines.', 'Data Engineering', 0, true),
('real-time-data-pipelines', 'Real-Time Data Pipelines', 'Duration: 4 months, Level: Advanced. Path: Streaming -> Kafka -> Flink -> Data Lakes -> Delta Lake -> Data Quality.', 'Data Engineering', 0, true),
('modern-data-stack', 'Modern Data Stack', 'Duration: 4 months, Level: Intermediate. Path: dbt -> Fivetran -> Snowflake -> Looker -> Data Modeling -> Analytics.', 'Data Engineering', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 12. Product Management & No-Code (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('product-manager-path', 'Product Manager Path', 'Duration: 5 months, Level: Beginner. Path: Product Thinking -> User Research -> Roadmapping -> Metrics -> Agile -> PRDs.', 'Product Management & No-Code', 0, true),
('no-code-builder', 'No-Code Builder', 'Duration: 3 months, Level: Beginner. Path: Webflow -> Bubble -> Airtable -> Zapier -> Make -> Launch Products.', 'Product Management & No-Code', 0, true),
('low-code-developer', 'Low-Code Developer', 'Duration: 4 months, Level: Beginner. Path: AppSheet -> Power Apps -> Retool -> Internal Tools -> Automation.', 'Product Management & No-Code', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 13. System Design (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('system-design-fundamentals', 'System Design Fundamentals', 'Duration: 4 months, Level: Intermediate. Path: Scalability -> Load Balancing -> Caching -> Databases -> CDN -> APIs.', 'System Design', 0, true),
('distributed-systems', 'Distributed Systems', 'Duration: 5 months, Level: Advanced. Path: Microservices -> Message Queues -> Consistency -> CAP Theorem -> Patterns.', 'System Design', 0, true),
('interview-ready-system-design', 'Interview-Ready System Design', 'Duration: 3 months, Level: Advanced. Path: Design Instagram -> Design WhatsApp -> Design Netflix -> Mock Interviews.', 'System Design', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 14. UI/UX Design (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('ui-ux-designer-bootcamp', 'UI/UX Designer Bootcamp', 'Duration: 6 months, Level: Beginner. Path: Design Thinking -> Figma -> Wireframing -> Prototyping -> User Testing -> Portfolio.', 'UI/UX Design', 0, true),
('advanced-figma-prototyping', 'Advanced Figma & Prototyping', 'Duration: 3 months, Level: Intermediate. Path: Components -> Auto Layout -> Plugins -> Animation -> Handoff -> Design Systems.', 'UI/UX Design', 0, true),
('ux-research-strategy', 'UX Research & Strategy', 'Duration: 4 months, Level: Intermediate. Path: User Interviews -> A/B Testing -> Analytics -> Information Architecture -> Personas.', 'UI/UX Design', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 15. Testing & QA (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('qa-automation-engineer', 'QA Automation Engineer', 'Duration: 4 months, Level: Beginner. Path: Manual Testing -> Selenium -> Cypress -> API Testing -> CI/CD -> Test Plans.', 'Testing & QA', 0, true),
('performance-testing', 'Performance Testing', 'Duration: 3 months, Level: Intermediate. Path: JMeter -> Load Testing -> Stress Testing -> Performance Metrics.', 'Testing & QA', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 16. Emerging Tech (NEW)
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('ar-vr-development', 'AR/VR Development', 'Duration: 5 months, Level: Advanced. Path: Unity AR -> ARKit -> ARCore -> Meta Quest -> Spatial Computing.', 'Emerging Tech', 0, true),
('iot-developer', 'IoT Developer', 'Duration: 4 months, Level: Intermediate. Path: Raspberry Pi -> Arduino -> MQTT -> Sensors -> Edge Computing -> AWS IoT.', 'Emerging Tech', 0, true),
('quantum-computing', 'Quantum Computing', 'Duration: 4 months, Level: Advanced. Path: Qiskit -> Quantum Algorithms -> IBM Quantum -> Future Tech.', 'Emerging Tech', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- Special Tracks
INSERT INTO vidya.courses (slug, title, description, category, price, is_published)
VALUES 
('computer-awareness-ssc-banking', 'Computer Awareness for SSC/Banking', 'Specialized track for government exam preparation.', 'Government Exam Special Tracks', 0, true),
('it-officer-preparation', 'IT Officer Preparation', 'Deep dive into IT topics for specialist officer exams.', 'Government Exam Special Tracks', 0, true),
('freelance-web-developer', 'Freelance Web Developer', 'How to transition from employee to independent freelancer.', 'Freelancing', 0, true),
('tech-interview-communication', 'Tech Interview Communication', 'Soft skills and communication strategies for technical roles.', 'Soft Skills', 0, true)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;
