import { FeSalesOrder } from "@/types/weclapp/salesOrder";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

export const mockSalesOrders: FeSalesOrder[] = [
    {
      id: "13",
      number: "SO-2025-013",
      customer: "Pi Analytics GmbH",
      grossAmount: "18760",
      netAmount: "17180",
      status: "active",
      items: [
        { name: "Data Mesh Adoption",            quantity: 10, unitPrice: "60" },
        { name: "Streaming ETL",                 quantity: 12, unitPrice: "55" },
        { name: "Customer Segmentation",         quantity: 14, unitPrice: "50" },
        { name: "Monte Carlo Simulation",        quantity:  7, unitPrice: "65" },
        { name: "Data Catalog Curation",         quantity:  9, unitPrice: "60" },
        { name: "Feature Store Setup",           quantity: 11, unitPrice: "55" },
        { name: "ML Ops Pipeline",               quantity: 13, unitPrice: "50" },
        { name: "Synthetic-Data Generation",     quantity:  5, unitPrice: "70" },
        { name: "Real-time Dashboard",           quantity: 15, unitPrice: "45" },
        { name: "Churn Prediction Model",        quantity:  6, unitPrice: "70" },
        { name: "Data Drift Monitoring",         quantity:  8, unitPrice: "65" },
        { name: "SLI/SLO Definition",            quantity: 16, unitPrice: "45" }
      ]
    },
    {
      id: "14",
      number: "SO-2025-014",
      customer: "Rho Consulting AG",
      grossAmount: "19685",
      netAmount: "18116",
      status: "active",
      items: [
        { name: "Journey Mapping",               quantity: 12, unitPrice: "55" },
        { name: "Product Discovery Sprint",      quantity:  9, unitPrice: "65" },
        { name: "Lean Canvas Workshop",          quantity:  7, unitPrice: "65" },
        { name: "Hypothesis Backlog",            quantity: 11, unitPrice: "60" },
        { name: "Story-Mapping Session",         quantity: 14, unitPrice: "55" },
        { name: "Competitor Teardown",           quantity: 13, unitPrice: "50" },
        { name: "Growth Experiment Design",      quantity: 10, unitPrice: "60" },
        { name: "Pricing Strategy Audit",        quantity: 15, unitPrice: "45" },
        { name: "Value Proposition Test",        quantity:  6, unitPrice: "70" },
        { name: "OKR Laddering",                 quantity: 16, unitPrice: "45" },
        { name: "Market Positioning",            quantity:  8, unitPrice: "65" },
        { name: "Stakeholder Interview Pack",    quantity:  5, unitPrice: "70" }
      ]
    },
    {
      id: "15",
      number: "SO-2025-015",
      customer: "Tau Digital GmbH",
      grossAmount: "20320",
      netAmount: "18798",
      status: "active",
      items: [
        { name: "Headless CMS Setup",            quantity: 11, unitPrice: "60" },
        { name: "GraphQL Gateway",               quantity:  9, unitPrice: "65" },
        { name: "Static-Site Generation",        quantity: 14, unitPrice: "55" },
        { name: "Jamstack Migration",            quantity:  7, unitPrice: "65" },
        { name: "Personalization Engine",        quantity: 10, unitPrice: "60" },
        { name: "E-commerce Checkout Flow",      quantity: 12, unitPrice: "55" },
        { name: "Image Optimization",            quantity: 15, unitPrice: "45" },
        { name: "Search Index Tuning",           quantity:  8, unitPrice: "65" },
        { name: "SSR Performance Audit",         quantity: 13, unitPrice: "50" },
        { name: "SEO Schema Markup",             quantity: 16, unitPrice: "45" },
        { name: "Content Localization",          quantity:  5, unitPrice: "70" },
        { name: "PWA Enablement",                quantity:  6, unitPrice: "70" }
      ]
    },
    {
      id: "16",
      number: "SO-2025-016",
      customer: "Upsilon Systems Ltd",
      grossAmount: "19040",
      netAmount: "17518",
      status: "active",
      items: [
        { name: "Edge-AI Inference",             quantity:  8, unitPrice: "65" },
        { name: "On-device Quantization",        quantity:  6, unitPrice: "70" },
        { name: "Federated Learning Setup",      quantity: 11, unitPrice: "60" },
        { name: "Model Compression",             quantity: 14, unitPrice: "55" },
        { name: "Energy Profiling",              quantity: 13, unitPrice: "50" },
        { name: "Latency Benchmark",             quantity: 10, unitPrice: "60" },
        { name: "AutoML Trial",                  quantity: 12, unitPrice: "55" },
        { name: "Transfer-Learning PoC",         quantity:  7, unitPrice: "65" },
        { name: "Hyper-parameter Sweep",         quantity: 15, unitPrice: "45" },
        { name: "Feature-Fusion Engine",         quantity: 16, unitPrice: "45" },
        { name: "Drift-Detection Module",        quantity:  5, unitPrice: "70" },
        { name: "Explainability Report",         quantity:  9, unitPrice: "65" }
      ]
    },
    {
      id: "17",
      number: "SO-2025-017",
      customer: "Phi Solutions Corp",
      grossAmount: "19995",
      netAmount: "18395",
      status: "active",
      items: [
        { name: "API Gateway Hardening",         quantity: 10, unitPrice: "60" },
        { name: "JWT Rotation",                  quantity:  5, unitPrice: "70" },
        { name: "Rate-Limiting Rules",           quantity: 12, unitPrice: "55" },
        { name: "OAuth2 Migration",              quantity:  8, unitPrice: "65" },
        { name: "SSO Federation",                quantity: 11, unitPrice: "60" },
        { name: "Security Header Audit",         quantity: 14, unitPrice: "55" },
        { name: "Zero-Trust Policy",             quantity:  7, unitPrice: "65" },
        { name: "Secret Scanning CI",            quantity: 13, unitPrice: "50" },
        { name: "Compliance Gap Scan",           quantity: 16, unitPrice: "45" },
        { name: "Threat-Model Workshop",         quantity:  9, unitPrice: "65" },
        { name: "WAF Rule-set Tuning",           quantity: 15, unitPrice: "45" },
        { name: "SAST Pipeline",                 quantity:  6, unitPrice: "70" }
      ]
    },
    {
      id: "18",
      number: "SO-2025-018",
      customer: "Chi Cloud GmbH",
      grossAmount: "20560",
      netAmount: "18915",
      status: "active",
      items: [
        { name: "Multicloud Landing Zone",       quantity: 11, unitPrice: "60" },
        { name: "Policy-as-Code Library",        quantity: 14, unitPrice: "55" },
        { name: "Infrastructure Blueprint",      quantity:  8, unitPrice: "65" },
        { name: "FinOps Dashboard",              quantity: 12, unitPrice: "55" },
        { name: "Budget Guardrails",             quantity:  6, unitPrice: "70" },
        { name: "Tagging Enforcement",           quantity: 10, unitPrice: "60" },
        { name: "DR Automation",                 quantity: 13, unitPrice: "50" },
        { name: "Immutable Backups",             quantity:  9, unitPrice: "65" },
        { name: "Cloud Runbook",                 quantity: 15, unitPrice: "45" },
        { name: "Right-sizing Analysis",         quantity: 16, unitPrice: "45" },
        { name: "Billing Anomaly Alerts",        quantity:  5, unitPrice: "70" },
        { name: "Compliance Posture Scan",       quantity:  7, unitPrice: "65" }
      ]
    },
    {
      id: "19",
      number: "SO-2025-019",
      customer: "Omega X Ventures",
      grossAmount: "18235",
      netAmount: "16690",
      status: "active",
      items: [
        { name: "Investor Pitch Deck",           quantity: 13, unitPrice: "50" },
        { name: "Financial Projections",         quantity: 11, unitPrice: "60" },
        { name: "TAM/SAM/SOM Analysis",          quantity:  9, unitPrice: "65" },
        { name: "Competitive Matrix",            quantity: 12, unitPrice: "55" },
        { name: "Go-to-Market Plan",             quantity: 14, unitPrice: "55" },
        { name: "Pricing Model",                 quantity:  6, unitPrice: "70" },
        { name: "Growth OKRs",                   quantity: 10, unitPrice: "60" },
        { name: "Fundraising Roadmap",           quantity: 16, unitPrice: "45" },
        { name: "Cap Table Review",              quantity:  8, unitPrice: "65" },
        { name: "Investor Briefing",             quantity:  5, unitPrice: "70" },
        { name: "Product-Market Fit Survey",     quantity: 15, unitPrice: "45" },
        { name: "Exit Strategy Analysis",        quantity:  7, unitPrice: "65" }
      ]
    },
    {
      id: "20",
      number: "SO-2025-020",
      customer: "Sigma Y Labs",
      grossAmount: "19410",
      netAmount: "17800",
      status: "active",
      items: [
        { name: "Hardware-in-the-Loop Test",     quantity: 12, unitPrice: "55" },
        { name: "FPGA Prototyping",              quantity:  9, unitPrice: "65" },
        { name: "SoC Verification",              quantity: 10, unitPrice: "60" },
        { name: "PCB Layout Review",             quantity: 14, unitPrice: "55" },
        { name: "Signal-Integrity Analysis",     quantity:  7, unitPrice: "65" },
        { name: "Thermal Simulation",            quantity:  6, unitPrice: "70" },
        { name: "EMC Compliance Test",           quantity: 11, unitPrice: "60" },
        { name: "Prototype Assembly",            quantity: 15, unitPrice: "45" },
        { name: "Firmware Optimization",         quantity: 13, unitPrice: "50" },
        { name: "Boundary-Scan Setup",           quantity:  5, unitPrice: "70" },
        { name: "Yield Analysis",                quantity: 16, unitPrice: "45" },
        { name: "Reliability Modeling",          quantity:  8, unitPrice: "65" }
      ]
    },
    {
      id: "21",
      number: "SO-2025-021",
      customer: "Epsilon Robotics AG",
      grossAmount: "20190",
      netAmount: "18575",
      status: "active",
      items: [
        { name: "ROS2 Migration",                quantity:  9, unitPrice: "65" },
        { name: "SLAM Optimization",             quantity: 10, unitPrice: "60" },
        { name: "Motion Planning Module",        quantity: 12, unitPrice: "55" },
        { name: "Gazebo Simulation",             quantity: 14, unitPrice: "55" },
        { name: "Sensor Fusion",                 quantity:  8, unitPrice: "65" },
        { name: "PID Tuning",                    quantity: 11, unitPrice: "60" },
        { name: "Autonomy Stack Audit",          quantity:  6, unitPrice: "70" },
        { name: "Failsafe Design",               quantity:  7, unitPrice: "65" },
        { name: "Field Test Campaign",           quantity: 15, unitPrice: "45" },
        { name: "Edge AI Accelerator",           quantity: 16, unitPrice: "45" },
        { name: "OTA Update System",             quantity: 13, unitPrice: "50" },
        { name: "Safety Case Draft",             quantity:  5, unitPrice: "70" }
      ]
    },
    {
      id: "22",
      number: "SO-2025-022",
      customer: "Kappa AI LLC",
      grossAmount: "18880",
      netAmount: "17290",
      status: "active",
      items: [
        { name: "Prompt Engineering",            quantity: 14, unitPrice: "55" },
        { name: "RAG Architecture",              quantity: 11, unitPrice: "60" },
        { name: "Vector-DB Indexing",            quantity: 10, unitPrice: "60" },
        { name: "Few-shot Dataset Creation",     quantity:  9, unitPrice: "65" },
        { name: "Alignment Tuning",              quantity:  6, unitPrice: "70" },
        { name: "Safety Guardrails",             quantity: 12, unitPrice: "55" },
        { name: "Eval Harness Setup",            quantity: 15, unitPrice: "45" },
        { name: "Bias Audit",                    quantity:  7, unitPrice: "65" },
        { name: "Hallucination Detector",        quantity: 13, unitPrice: "50" },
        { name: "Token-Budget Estimator",        quantity: 16, unitPrice: "45" },
        { name: "Retrieval Plugin",              quantity:  5, unitPrice: "70" },
        { name: "OpenAI Function Design",        quantity:  8, unitPrice: "65" }
      ]
    },
    {
      id: "23",
      number: "SO-2025-023",
      customer: "Lambda Bioinformatics",
      grossAmount: "18045",
      netAmount: "16521",
      status: "active",
      items: [
        { name: "Genome Assembly",               quantity: 10, unitPrice: "60" },
        { name: "Variant Calling Pipeline",      quantity: 12, unitPrice: "55" },
        { name: "RNA-seq Analysis",              quantity: 11, unitPrice: "60" },
        { name: "Metagenomics Study",            quantity:  9, unitPrice: "65" },
        { name: "Phylogenetic Tree Build",       quantity:  8, unitPrice: "65" },
        { name: "CRISPR Off-target Scan",        quantity:  5, unitPrice: "70" },
        { name: "Protein Docking",               quantity: 13, unitPrice: "50" },
        { name: "Functional Annotation",         quantity: 15, unitPrice: "45" },
        { name: "Sample QC Report",              quantity: 14, unitPrice: "55" },
        { name: "Data Warehouse ETL",            quantity: 16, unitPrice: "45" },
        { name: "Laboratory LIMS Setup",         quantity:  6, unitPrice: "70" },
        { name: "ML-based Gene Prediction",      quantity:  7, unitPrice: "65" }
      ]
    },
    {
      id: "24",
      number: "SO-2025-024",
      customer: "Nu Quantum Technologies",
      grossAmount: "20670",
      netAmount: "19014",
      status: "active",
      items: [
        { name: "QKD Feasibility Study",         quantity:  7, unitPrice: "65" },
        { name: "Quantum Simulator PoC",         quantity: 10, unitPrice: "60" },
        { name: "Photonic Chip Layout",          quantity: 12, unitPrice: "55" },
        { name: "Cryo-control Firmware",         quantity:  6, unitPrice: "70" },
        { name: "Noise Mitigation",              quantity:  8, unitPrice: "65" },
        { name: "Error Correction Coding",       quantity: 11, unitPrice: "60" },
        { name: "Quantum-Safe Crypto Audit",     quantity: 14, unitPrice: "55" },
        { name: "Hybrid Algorithm Design",       quantity: 13, unitPrice: "50" },
        { name: "Entanglement Benchmark",        quantity:  5, unitPrice: "70" },
        { name: "Pulse Sequence Optimization",   quantity: 16, unitPrice: "45" },
        { name: "QASM Compiler Update",          quantity: 15, unitPrice: "45" },
        { name: "Research Paper Draft",          quantity:  9, unitPrice: "65" }
      ]
    }
  ] as const;

export const mockGetSalesOrders = async (
    searchText: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FeSalesOrder>> => {
    // Filter salesOrders based on search text
    let filteredSalesOrders = mockSalesOrders;
  
    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase().trim();
      filteredSalesOrders = mockSalesOrders.filter((salesOrder) => {
        return (
          salesOrder.number.toLowerCase().includes(searchLower) ||
          salesOrder.customer.toLowerCase().includes(searchLower) ||
          salesOrder.status.toLowerCase().includes(searchLower) ||
          salesOrder.grossAmount.includes(searchLower) ||
          salesOrder.netAmount.includes(searchLower) ||
          salesOrder.items.some((item) =>
            item.name.toLowerCase().includes(searchLower)
          )
        );
      });
    }
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredSalesOrders.slice(startIndex, endIndex);
  
    return {
      items: paginatedItems,
      total: filteredSalesOrders.length,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(filteredSalesOrders.length / pageSize),
    };
  };