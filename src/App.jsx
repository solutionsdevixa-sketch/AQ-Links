import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, NavLink, Route, Routes, Link, useNavigate } from 'react-router-dom';
import awsLogo from './assets/aws-logo.svg';
import azureLogo from './assets/azure-logo.svg';
import aqLinksLogo from './assets/aq-links-logo.svg';
import gcpLogo from './assets/gcp-logo.svg';
import starterLogo from './assets/starter-logo.svg';
import unionpayLogo from './assets/unionpay-logo.svg';

const products = [
  { id: 1, name: 'AWS Cloud Architecture', provider: 'AWS', price: 45000, description: 'Scalable cloud design, deployment, and optimization.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'AWS Managed Security', provider: 'AWS', price: 38000, description: 'Security posture, monitoring, and threat protection.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'AWS DevOps Starter', provider: 'AWS', price: 32000, description: 'CI/CD pipeline setup and deployment automation.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'AWS Backup & Disaster Recovery', provider: 'AWS', price: 28000, description: 'Backup strategy and recovery planning for businesses.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'AWS Cost Optimization Review', provider: 'AWS', price: 15000, description: 'Reduce cloud spend and improve usage efficiency.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'AWS Monitoring Setup', provider: 'AWS', price: 22000, description: 'CloudWatch monitoring and alerting setup.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'AWS IAM & Security Hardening', provider: 'AWS', price: 18000, description: 'Identity management and account security best practices.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'AWS Website Hosting Setup', provider: 'AWS', price: 12000, description: 'Deploy and host a business website on AWS.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },

  { id: 9, name: 'Azure Cloud Migration', provider: 'Azure', price: 52000, description: 'Migrate your workloads to Microsoft Azure smoothly.', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80' },
  { id: 10, name: 'Azure DevOps & Monitoring', provider: 'Azure', price: 41000, description: 'CI/CD pipelines, observability, and governance.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 11, name: 'Azure Virtual Desktop Setup', provider: 'Azure', price: 36000, description: 'Remote workspace setup for teams.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 12, name: 'Azure Backup Policy Setup', provider: 'Azure', price: 24000, description: 'Backup policies and retention design.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 13, name: 'Azure Cost Control Review', provider: 'Azure', price: 14000, description: 'Reduce Azure monthly spend and improve cost visibility.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 14, name: 'Azure Security Baseline', provider: 'Azure', price: 20000, description: 'Secure tenant setup and account protection.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 15, name: 'Azure Website Deployment', provider: 'Azure', price: 17000, description: 'Deploy websites and apps on Azure services.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 16, name: 'Azure Microsoft 365 Setup', provider: 'Azure', price: 11000, description: 'Email and collaboration setup for businesses.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },

  { id: 17, name: 'GCP Cloud Landing Zone', provider: 'GCP', price: 47000, description: 'Foundation setup for secure and scalable GCP usage.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },
  { id: 18, name: 'GCP Data Analytics Platform', provider: 'GCP', price: 56000, description: 'BigQuery, data pipelines, and cloud analytics.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 19, name: 'GCP Kubernetes Setup', provider: 'GCP', price: 43000, description: 'GKE cluster setup and orchestration support.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 20, name: 'GCP Security Review', provider: 'GCP', price: 21000, description: 'Review and improve cloud security posture.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 21, name: 'GCP Cost Optimization', provider: 'GCP', price: 16000, description: 'Identify savings and optimize GCP usage.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { id: 22, name: 'GCP Website Hosting Setup', provider: 'GCP', price: 13000, description: 'Deploy and host your website on GCP.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 23, name: 'GCP Backup & Recovery', provider: 'GCP', price: 23000, description: 'Reliable backup and disaster recovery planning.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80' },
  { id: 24, name: 'GCP Monitoring Setup', provider: 'GCP', price: 19000, description: 'Logging, monitoring, and alerting for apps.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },

  { id: 25, name: 'Website Hosting Setup', provider: 'Budget', price: 1500, description: 'Low-cost hosting setup for small businesses in Pakistan.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 26, name: 'Basic Email Setup', provider: 'Budget', price: 2000, description: 'Professional business email configuration and support.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 27, name: 'Small Server Backup Plan', provider: 'Budget', price: 2500, description: 'Affordable backup plan for data safety.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80' },
  { id: 28, name: 'Domain & DNS Configuration', provider: 'Budget', price: 3000, description: 'Get your domain connected and live quickly.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 29, name: 'Cloud Consultation', provider: 'Budget', price: 4500, description: 'One-hour consultation for cloud planning and guidance.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 30, name: 'Security Health Check', provider: 'Budget', price: 5000, description: 'Basic security review for your cloud setup.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 31, name: 'WordPress Hosting Assist', provider: 'Budget', price: 1800, description: 'Simple WordPress deployment help.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 32, name: 'Business Landing Page Setup', provider: 'Budget', price: 3500, description: 'One-page business site launch support.', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80' },
  { id: 33, name: 'SSL Certificate Installation', provider: 'Budget', price: 2200, description: 'Secure your website with HTTPS.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 34, name: 'Email Migration Help', provider: 'Budget', price: 3200, description: 'Move your email to a new platform safely.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 35, name: 'Basic IT Support Package', provider: 'Budget', price: 4000, description: 'Starter remote support for small teams.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80' },
  { id: 36, name: 'Cloud Training Session', provider: 'Budget', price: 4800, description: 'Introductory cloud training for your staff.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },
  { id: 37, name: 'Database Backup Setup', provider: 'Budget', price: 2700, description: 'Basic database backup configuration.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 38, name: 'Server Cleanup & Audit', provider: 'Budget', price: 2400, description: 'Quick review and cleanup of your server setup.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 39, name: 'Office Network Setup', provider: 'Budget', price: 3900, description: 'Small office network planning and installation help.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 40, name: 'Monthly Support Plan', provider: 'Budget', price: 5000, description: 'Affordable monthly support for startups.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
];

const realisticPrices = {
  1: 85000, 2: 65000, 3: 60000, 4: 55000, 5: 30000, 6: 42000, 7: 35000, 8: 28000,
  9: 95000, 10: 70000, 11: 65000, 12: 45000, 13: 30000, 14: 38000, 15: 32000, 16: 26000,
  17: 90000, 18: 110000, 19: 85000, 20: 40000, 21: 30000, 22: 28000, 23: 42000, 24: 38000,
  25: 12000, 26: 9000, 27: 10000, 28: 6000, 29: 8500, 30: 14000, 31: 11000, 32: 18000,
  33: 5000, 34: 18000, 35: 15000, 36: 12000, 37: 12000, 38: 10000, 39: 20000, 40: 18000,
};
products.forEach((product) => { product.price = realisticPrices[product.id] ?? product.price; });
products.forEach((product) => { if (product.provider === 'Budget') product.provider = 'Starter'; });
products.forEach((product) => { if (product.provider === 'Starter') product.originalPrice = Math.ceil(product.price * 1.25 / 500) * 500; });
const categories = ['All', 'AWS', 'Azure', 'GCP', 'Starter'];
const providerName = (provider) => provider === 'Budget' ? 'Starter' : provider;
const getGreetingPeriod = () => { const hour = new Date().getHours(); return hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : hour < 21 ? 'evening' : 'night'; };
const getTimeGreeting = () => `Good ${getGreetingPeriod()}`;
const GreetingIcon = ({ period }) => period === 'evening' || period === 'night' ? <svg className={`greeting-icon ${period}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 15.5A8 8 0 0 1 8.5 5.2 8.5 8.5 0 1 0 18.5 15.5Z" /><path className="greeting-star" d="M18.5 4.2V7M17.1 5.6H20M5 5.2V7M4 6.1H6" /></svg> : <svg className={`greeting-icon ${period}`} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7 7M17 17L19.1 19.1M19.1 4.9L17 7M7 17L4.9 19.1" /></svg>;
const PriceDisplay = ({ item, total = false }) => item.provider === 'Starter' ? <span className="discount-price"><del>{money(item.originalPrice * (total ? item.qty : 1))}</del><strong>{money(item.price * (total ? item.qty : 1))}</strong><small>Starter offer</small></span> : <strong>{money(item.price * (total ? item.qty : 1))}</strong>;
const money = (value) => `PKR ${value.toLocaleString('en-PK')}`;
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const providerImagePools = {
  AWS: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
  ],
  Azure: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=85',
  ],
  GCP: [
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85',
  ],
  Budget: [
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=85',
  ],
};
providerImagePools.Starter = providerImagePools.Budget;
const serviceImageGroups = [
  { terms: ['security', 'iam'], image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['backup', 'disaster', 'recovery'], image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['cost', 'spend', 'finance'], image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['monitoring', 'logging', 'alerting'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['devops', 'ci/cd', 'pipeline', 'deployment', 'automation'], image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['migration'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['data', 'analytics', 'bigquery'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['kubernetes', 'gke', 'server'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['email', 'microsoft 365'], image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['domain', 'dns', 'ssl', 'wordpress', 'website', 'landing'], image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['database'], image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['network', 'office'], image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['training'], image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['consultation', 'support', 'cleanup', 'audit'], image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85' },
  { terms: ['architecture', 'hosting', 'cloud'], image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85' },
];
const fallbackServiceImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85';
const getServiceImage = (service) => {
  const serviceName = service.name.toLowerCase();
  return serviceImageGroups.find(({ terms }) => terms.some((term) => serviceName.includes(term)))?.image || fallbackServiceImage;
};

function App() {
  const [users, setUsers] = useState(() => load('ht_users', []));
  const [currentUser, setCurrentUser] = useState(() => load('ht_currentUser', null));
  const [cart, setCart] = useState(() => load('ht_cart', []).map((item) => item.provider === 'Budget' ? { ...item, provider: 'Starter' } : item));
  const [provider, setProvider] = useState('All');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const saveUsers = (next) => { setUsers(next); localStorage.setItem('ht_users', JSON.stringify(next)); };
  const saveCurrentUser = (next) => { setCurrentUser(next); localStorage.setItem('ht_currentUser', JSON.stringify(next)); };
  const saveCart = (next) => { setCart(next); localStorage.setItem('ht_cart', JSON.stringify(next)); };

  const addToCart = (product, goToCart = true) => {
    const existing = cart.find((item) => item.id === product.id);
    const next = existing ? cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...cart, { ...product, qty: 1 }];
    saveCart(next);
    if (goToCart) navigate('/cart');
  };

  const updateQty = (id, qty) => saveCart(cart.map((item) => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  const removeItem = (id) => saveCart(cart.filter((item) => item.id !== id));
  const clearCart = () => saveCart([]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const filteredProducts = products.filter((p) => (provider === 'All' || p.provider === provider) && `${p.name} ${p.description} ${p.provider}`.toLowerCase().includes(query.toLowerCase()));
  const checkout = () => { if (!currentUser) return navigate('/login'); saveCart([]); navigate('/success'); };
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(null), 3600); };

  return <div className="app-shell">
    <div className="ambient-art" aria-hidden="true"><span className="watermark-cloud cloud-left"></span><span className="watermark-cloud cloud-right"></span><span className="watermark-platform"></span><span className="watermark-galaxy"><i></i><b></b><em></em></span></div>
    <header className="topbar">
      <Link to="/" className="brand"><Logo /></Link>
      <nav className="main-nav">
        <NavLink to="/" end>Services</NavLink>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/contact" className="nav-contact">Contact</NavLink>
        <NavLink to="/cart" className="nav-cart"><span>Cart</span><b>{cart.length}</b></NavLink>
        {currentUser ? <><span className="user-greeting"><GreetingIcon period={getGreetingPeriod()} />{getTimeGreeting()}, {currentUser.name || currentUser.email}</span><button className="linkbtn" onClick={() => { saveCurrentUser(null); navigate('/'); }}>Logout</button></> : <NavLink to="/login" className="nav-login">Login</NavLink>}
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<Home provider={provider} setProvider={setProvider} query={query} setQuery={setQuery} filteredProducts={filteredProducts} addToCart={addToCart} cart={cart} />} />
      <Route path="/login" element={<AuthPage mode="login" users={users} saveUsers={saveUsers} saveCurrentUser={saveCurrentUser} showToast={showToast} />} />
      <Route path="/register" element={<AuthPage mode="register" users={users} saveUsers={saveUsers} saveCurrentUser={saveCurrentUser} showToast={showToast} />} />
      <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} clearCart={clearCart} subtotal={subtotal} />} />
      <Route path="/checkout" element={<Protected currentUser={currentUser}><CheckoutPage currentUser={currentUser} cart={cart} subtotal={subtotal} onCheckout={checkout} /></Protected>} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
    <ScrollToTopButton />
    {toast && <Toast message={toast} onClose={() => setToast(null)} />}
  </div>;
}

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 260);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <button className={`scroll-top ${visible ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Go to top" title="Go to top">↑</button>;
};

const Home = ({ provider, setProvider, query, setQuery, filteredProducts, addToCart, cart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const handleKeyDown = (event) => { if (event.key === 'Escape') setSelectedProduct(null); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKeyDown); };
  }, [selectedProduct]);

  return <main>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">Build with confidence</span><h1>Reliable infrastructure for ambitious businesses.</h1><p>Practical cloud, hosting, and security support that keeps your team moving forward.</p><div className="hero-providers"><span><ProviderLogo provider="AWS" />AWS</span><span><ProviderLogo provider="Azure" />Azure</span><span><ProviderLogo provider="GCP" />Google Cloud</span><span><ProviderLogo provider="Starter" />Starter</span></div></div>
      <div className="cloud-visual" aria-label="AQ Links cloud services"><div className="cloud-orbit orbit-one"></div><div className="cloud-orbit orbit-two"></div><div className="cloud-core"><span>AQ</span><strong>LINKS</strong></div><i className="cloud-dot dot-one"><ProviderLogo provider="AWS" /></i><i className="cloud-dot dot-two"><ProviderLogo provider="Azure" /></i><i className="cloud-dot dot-three"><ProviderLogo provider="GCP" /></i><i className="cloud-dot dot-four"><ProviderLogo provider="Starter" /></i></div>
    </section>
    <section className="toolbar">
      <label className="search-box"><span className="search-icon" aria-hidden="true"></span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services" aria-label="Search services" /></label>
      <div className="tabs">{categories.map((c) => <button key={c} className={`${c === provider ? 'active ' : ''}${c !== 'All' ? `provider-tab ${c.toLowerCase()}` : ''}`} onClick={() => setProvider(c)}>{c !== 'All' && <ProviderLogo provider={c} />}{c}</button>)}</div>
    </section>
    <section className="grid">{filteredProducts.map((p) => <article key={p.id} className="card" role="button" tabIndex="0" onClick={() => setSelectedProduct(p)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedProduct(p); } }}><img src={getServiceImage(p)} alt={`${p.name} service`} className="product-image" /><span className="card-provider"><ProviderLogo provider={p.provider} />{p.provider}</span><h3>{p.name}</h3><p>{p.description}</p><PriceDisplay item={p} /><button className={`provider-button ${p.provider.toLowerCase()}`} onClick={(event) => { event.stopPropagation(); addToCart(p); }}>Add to cart</button></article>)}</section>
    {selectedProduct && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}><section className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close service details" title="Close">×</button><img src={getServiceImage(selectedProduct)} alt={`${selectedProduct.name} service`} className="modal-image" /><div className="modal-content"><span className="card-provider"><ProviderLogo provider={selectedProduct.provider} />{selectedProduct.provider}</span><h2 id="service-modal-title">{selectedProduct.name}</h2><p>{selectedProduct.description}</p><div className="modal-price"><PriceDisplay item={selectedProduct} /><small>per service</small></div><div className="modal-actions"><button className={`provider-button ${selectedProduct.provider.toLowerCase()} modal-cart-button`} onClick={() => { setSelectedProduct(null); addToCart(selectedProduct, false); }}>Add to cart <span aria-hidden="true">→</span></button><button className="modal-cart-button modal-view-cart-button" onClick={() => navigate('/cart')}>View cart <span aria-hidden="true">→</span></button></div></div></section></div>}
  </main>;
};

const AuthPage = ({ mode, users, saveUsers, saveCurrentUser, showToast }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (mode === 'register') {
      if (users.some((u) => u.email === email)) return showToast('An account with this email already exists.');
      saveUsers([...users, { name, email, password }]); saveCurrentUser({ name, email }); navigate('/');
    } else {
      const user = users.find((u) => u.email === email && u.password === password); if (!user) return showToast('Email or password is incorrect.');
      saveCurrentUser({ name: user.name || user.email, email }); navigate('/');
    }
  };
  return <form className="auth" onSubmit={submit}><h2>{mode === 'login' ? 'Login' : 'Register'}</h2>{mode === 'register' && <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required /> }<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><span className="password-field"><input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><button type="button" className={`password-toggle ${showPassword ? 'is-visible' : ''}`} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} title={showPassword ? 'Hide password' : 'Show password'}><span className="eye-icon" aria-hidden="true"></span></button></span><button type="submit">{mode}</button><p><Link to={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Need an account?' : 'Already have an account?'}</Link></p></form>;
};

const CartPage = ({ cart, updateQty, removeItem, clearCart, subtotal }) => {
  const navigate = useNavigate();
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  return (
    <main className="panel cart-panel">
      <div className="cart-heading"><div><span className="eyebrow">Your selection</span><h2>Your Cart</h2></div><div className="cart-heading-actions"><span className="cart-count">{cart.length} {cart.length === 1 ? 'service' : 'services'}</span>{cart.length > 0 && <button className="delete-all-button" onClick={() => setShowClearConfirmation(true)}><span className="trash-icon" aria-hidden="true"></span>Delete all</button>}</div></div>

      {cart.length === 0 ? (
        <div className="empty-cart"><span className="empty-cart-icon">+</span><h3>Your cart is waiting</h3><p>Browse our cloud services and add a solution to get started.</p><Link to="/" className="about-action">Explore services <span aria-hidden="true">↗</span></Link></div>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cartrow">
              <img src={getServiceImage(item)} alt={`${item.name} service`} className="cart-image" />

              <div className="cart-details">
                <span className="cart-provider"><ProviderLogo provider={item.provider} />{item.provider}</span>
                <strong>{item.name}</strong>
                <div className="cart-description">{item.description}</div>
                <div className="cart-price">{money(item.price)} <small>per service</small></div>
              </div>

              <div className="cart-actions">
                <div className="cart-qty"><button aria-label={`Decrease quantity of ${item.name}`} onClick={() => updateQty(item.id, item.qty - 1)}>-</button><span>{item.qty}</span><button aria-label={`Increase quantity of ${item.name}`} onClick={() => updateQty(item.id, item.qty + 1)}>+</button></div>
                <button className="remove-button" onClick={() => removeItem(item.id)}><span className="trash-icon" aria-hidden="true"></span>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary"><div><span>Estimated total</span><strong>{money(subtotal)}</strong></div><button disabled={!cart.length} onClick={() => navigate('/checkout')}>Proceed to checkout <span aria-hidden="true">→</span></button></div>
      {showClearConfirmation && <div className="confirm-backdrop" role="presentation"><section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clear-cart-title"><span className="confirm-icon"><span className="trash-icon" aria-hidden="true"></span></span><h3 id="clear-cart-title">Clear your cart?</h3><p>Remove all selected services from your cart?</p><div className="confirm-actions"><button className="confirm-cancel" onClick={() => setShowClearConfirmation(false)}>Cancel</button><button className="confirm-delete" onClick={() => { clearCart(); setShowClearConfirmation(false); }}><span className="trash-icon" aria-hidden="true"></span>Delete all</button></div></section></div>}
    </main>
  );
};

const Protected = ({ currentUser, children }) => currentUser ? children : <Navigate to="/login" replace />;

const Toast = ({ message, onClose }) => <div className="toast" role="status"><span className="toast-icon">!</span><span>{message}</span><button onClick={onClose} aria-label="Close notification">×</button></div>;

const providerIcons = { AWS: awsLogo, Azure: azureLogo, GCP: gcpLogo };
const ProviderLogo = ({ provider }) => {
  const iconSource = provider === 'Budget' || provider === 'Starter' ? starterLogo : providerIcons[provider];
  return iconSource ? <img className={`provider-logo ${provider.toLowerCase()}`} src={iconSource} alt={`${provider} logo`} /> : <span className="provider-fallback" aria-hidden="true">+</span>;
};

const CheckoutPage = ({ currentUser, cart, subtotal, onCheckout }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentTouched, setPaymentTouched] = useState(false);
  const cardDigits = card.replace(/\D/g, '');
  const expiryIsValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  const expiryMonthEntered = expiry.length >= 2;
  const cardIsValid = cardDigits.length >= 13 && cardDigits.length <= 19;
  const cvvIsValid = /^\d{3,4}$/.test(cvv);
  const paymentIsValid = cardIsValid && expiryIsValid && cvvIsValid;
  return (
    <main className="checkout-page">
      <section className="checkout-form panel">
        <div className="checkout-heading"><span className="eyebrow">Secure checkout</span><h1>Billing details</h1><p>Welcome, {currentUser.name || currentUser.email}</p></div>
        <div className="checkout-fields">
          <label>Full name<input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <label>Email address<input type="email" value={currentUser.email} readOnly /></label>
          <label>Contact number<input type="tel" placeholder="+92 300 0000000" value={phone} onChange={(e) => setPhone(e.target.value)} required /></label>
          <label className="field-wide">Billing address<input placeholder="Street address, office or house number" value={address} onChange={(e) => setAddress(e.target.value)} required /></label>
          <label>City<input placeholder="Islamabad" value={city} onChange={(e) => setCity(e.target.value)} required /></label>
          <label>Cardholder name<input placeholder="Name as shown on card" value={cardholder} onChange={(e) => setCardholder(e.target.value)} required /></label>
          <label className="field-wide">Card number<span className="card-input"><input className={paymentTouched && !cardIsValid ? 'input-error' : ''} placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength="23" value={card} onChange={(e) => { const digits = e.target.value.replace(/\D/g, '').slice(0, 19); setCard(digits.match(/.{1,4}/g)?.join(' ') || ''); }} onBlur={() => setPaymentTouched(true)} required /><span className="card-brands" aria-label="Visa, Mastercard and UnionPay accepted"><b className="visa-mark">VISA</b><b className="mastercard-mark"><i></i><i></i></b><img className="unionpay-mark" src={unionpayLogo} alt="UnionPay" /></span></span>{paymentTouched && !cardIsValid && <small className="validation-error">Enter 13 to 19 card digits.</small>}</label>
          <label>Expiry date<input className={(paymentTouched || expiryMonthEntered) && !expiryIsValid ? 'input-error' : ''} placeholder="MM/YY" inputMode="numeric" maxLength="5" value={expiry} onChange={(e) => { const digits = e.target.value.replace(/\D/g, '').slice(0, 4); setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits); }} onBlur={() => setPaymentTouched(true)} required />{(paymentTouched || expiryMonthEntered) && !expiryIsValid && <small className="validation-error">Month must be between 01 and 12.</small>}</label>
          <label>CVV / CVC<input className={paymentTouched && !cvvIsValid ? 'input-error' : ''} type="password" placeholder="3 or 4 digits" inputMode="numeric" maxLength="4" value={cvv} onChange={(e) => setCvv(e.target.value)} onBlur={() => setPaymentTouched(true)} required />{paymentTouched && !cvvIsValid && <small className="validation-error">Enter 3 or 4 digits.</small>}</label>
        </div>
        <div className="checkout-actions"><button onClick={() => { setPaymentTouched(true); if (paymentIsValid) onCheckout(); }} disabled={!cart.length || !name || !phone || !address || !city || !cardholder || !paymentIsValid}>Place order <span aria-hidden="true">→</span></button><button className="secondary" onClick={() => navigate('/cart')}>Back to cart</button></div>
      </section>
      <aside className="order-summary panel"><div className="summary-heading"><span className="eyebrow">Your order</span><h2>What you're buying</h2></div><div className="checkout-items">{cart.map((item) => <div className="checkout-item" key={item.id}><img src={getServiceImage(item)} alt={`${item.name} service`} /><div><strong>{item.name}</strong><span><ProviderLogo provider={item.provider} />{item.provider} · Qty {item.qty}</span></div><b>{money(item.price * item.qty)}</b></div>)}</div><div className="checkout-total"><span>Total</span><strong>{money(subtotal)}</strong></div><p className="summary-note">Your service details will be confirmed after your order is placed.</p><div className="mobile-payment-methods"><span>Pay securely with</span><div><img src="https://easypaisa.com.pk/wp-content/uploads/2026/01/cropped-cropped-easypaisa-logo-dark-1.png" alt="EasyPaisa" /><img src="https://www.jazzcash.com.pk/assets/svgs/JazzCash-logo-hd-80.svg" alt="JazzCash" /></div></div></aside>
    </main>
  );
};

const SuccessPage = () => <main className="panel success"><div className="celebration" aria-hidden="true"><span className="confetti confetti-one"></span><span className="confetti confetti-two"></span><span className="confetti confetti-three"></span><span className="confetti confetti-four"></span><span className="firework firework-one"></span><span className="firework firework-two"></span><span className="success-mark">✓</span></div><span className="eyebrow">Thank you for choosing AQ Links</span><h2>Congratulations!</h2><p>Your order has been placed successfully. We are excited to help your business move forward.</p><Link to="/">Continue shopping <span aria-hidden="true">→</span></Link></main>;

const Logo = () => <><img className="logo-image" src={aqLinksLogo} alt="" /><span className="logo-wordmark">AQ <small>LINKS</small></span></>;

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-brand"><Link to="/" className="brand"><Logo /></Link><p>Clear technology. Connected possibilities.</p><small>AQ LINKS</small></div>
      <div className="footer-column"><strong>Explore</strong><Link to="/">Services</Link><Link to="/about">About us</Link><Link to="/contact">Contact us</Link><Link to="/terms" className="terms-footer-link"><span>Terms &amp; Conditions</span><i aria-hidden="true">↗</i></Link><Link to="/cart">Your cart</Link></div>
      <div className="footer-column footer-contact"><strong>Get in touch</strong><a href="mailto:iamyousafkhan01@gmail.com">iamyousafkhan01@gmail.com</a><a href="tel:+923056592499">+92-305-6592499</a></div>
      <div className="footer-column footer-address"><strong>Visit us</strong><span>Al Quresh Phase 1 Shershah road Multan.</span></div>
    </div>
    <div className="footer-bottom"><span>© 2026 AQ LINKS</span><span>Cloud services, made clear.</span></div>
  </footer>
);

const AboutPage = () => (
  <main className="about-page">
    <section className="about-hero">
      <div>
        <span className="eyebrow">About us</span>
        <h1>Technology that helps businesses move forward.</h1>
      </div>
      <p>AQ LINKS is built on a simple belief: powerful technology should be practical, approachable, and within reach of every growing business.</p>
    </section>

    <section className="founder-section">
      <div className="founder-badge" aria-hidden="true">MH</div>
      <div className="founder-copy">
        <span className="eyebrow">Meet the founder</span>
        <h2>Muhammad Yousaf</h2>
        <p className="founder-role">Founder / Managing Director</p>
        <p>Since 2020, I have been building AQ LINKS with a clear purpose: to make dependable cloud services and technology guidance easier for businesses to understand and use.</p>
        <p>My work brings together a practical mindset, a passion for modern infrastructure, and a commitment to helping customers choose solutions that genuinely fit their goals. Every service is shaped around clarity, value, and long-term progress.</p>
      </div>
      <div className="about-stats"><div><strong>2020</strong><span>Founded</span></div><div><strong>40+</strong><span>Services</span></div><div><strong>3</strong><span>Cloud platforms</span></div></div>
    </section>

    <section className="about-values">
      <span className="eyebrow">Our approach</span>
      <h2>Clear advice. Reliable solutions. Real momentum.</h2>
      <p>From cloud architecture and security to hosting and everyday IT support, we help turn complex technology decisions into confident next steps.</p>
      <Link to="/contact" className="about-action">Start a conversation <span aria-hidden="true">↗</span></Link>
    </section>
  </main>
);

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-intro">
        <span className="eyebrow">Let's talk cloud</span>
        <h1>Have a project in mind?</h1>
        <p>Tell us what you are building, and our team will help you find the right cloud solution.</p>
        <div className="contact-details">
          <div><strong>Email</strong><a href="mailto:iamyousafkhan01@gmail.com">iamyousafkhan01@gmail.com</a></div>
          <div><strong>Contact Number</strong><a href="tel:+923056592499">+92-305-6592499</a></div>
          <div><strong>Office Address</strong><span>Al Quresh Phase 1 Shershah road Multan.</span></div>
          <div><strong>Availability</strong><span>Mon - Sat, 9:00 AM - 6:00 PM</span></div>
        </div>
      </section>

      <form className="contact-form" onSubmit={submit}>
        {sent ? (
          <div className="contact-success"><span className="success-mark">✓</span><h2>Message received</h2><p>Thanks for reaching out. We will get back to you soon.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div>
        ) : (
          <>
            <div className="form-heading"><span className="eyebrow">Contact us</span><h2>Start a conversation</h2></div>
            <label>Name<input type="text" placeholder="Your full name" required /></label>
            <label>Email<input type="email" placeholder="you@company.com" required /></label>
            <label>How can we help?<textarea placeholder="Tell us a little about your needs..." rows="5" required /></label>
            <button type="submit">Send message <span aria-hidden="true">↗</span></button>
          </>
        )}
      </form>
    </main>
  );
};

const TermsPage = () => (
  <main className="terms-page">
    <section className="terms-intro">
      <span className="eyebrow">AQ Links policy</span>
      <h1>Terms and Conditions</h1>
      <p>These terms explain the rules for using the AQ Links website and purchasing our cloud, hosting, security, backup, and IT services.</p>
      <small>Last updated: September 12, 2026</small>
    </section>
    <article className="terms-content">
      <p>The terms “We”, “Us”, “Our”, and “Company” refer to AQ Links. The terms “Visitor” and “User” refer to anyone who accesses or uses this website.</p>
      <p>Please read these Terms and Conditions carefully. By visiting or using this website, you agree to be bound by them. AQ Links may revise these terms from time to time by updating this page. Continued use of the website after changes are posted means that you accept the updated terms.</p>
      <h2>Use of Content</h2>
      <p>All logos, brands, marks, headings, labels, names, signatures, numerals, shapes, service descriptions, images, and other content appearing on this website are owned by AQ Links or used with permission, unless stated otherwise.</p>
      <p>You may not sell, modify, reproduce, display, publicly perform, distribute, or use website materials for a public or commercial purpose without written permission from AQ Links or the relevant rights holder.</p>
      <h2>Acceptable Website Use</h2>
      <h3>Security Rules</h3>
      <p>Visitors must not violate or attempt to violate the security of this website. This includes accessing data not intended for them, attempting to probe or test systems without authorization, bypassing authentication, interfering with service availability, introducing malicious code, or sending unsolicited promotional messages.</p>
      <p>Suspected security violations may be investigated and reported to the appropriate authorities where required by law.</p>
      <h3>General Rules</h3>
      <p>Visitors may not use this website to transmit, distribute, store, or publish material that encourages criminal conduct, violates applicable law, infringes intellectual-property or privacy rights, or is defamatory, obscene, threatening, abusive, hateful, or otherwise unlawful.</p>
      <h2>Orders and Services</h2>
      <p>Service descriptions, prices, availability, and delivery timelines are provided for general guidance and may change. AQ Links will confirm the scope of work and any relevant requirements before service delivery begins.</p>
      <p>Users are responsible for providing accurate contact, billing, access, and project information required to deliver an ordered service.</p>
      <h2>Indemnity</h2>
      <p>The User agrees to indemnify and hold harmless AQ Links, its founder, officers, employees, contractors, and agents from claims, actions, liabilities, losses, or damages arising from the User’s unlawful use of the website, misuse of a service, or breach of these terms.</p>
      <h2>Liability</h2>
      <p>To the maximum extent permitted by applicable law, AQ Links and its representatives will not be liable for direct, indirect, incidental, special, consequential, or exemplary damages arising from the use of, or inability to use, the website or a service.</p>
      <p>AQ Links is not responsible for interruptions, suspensions, termination of service, third-party statements or conduct, unauthorized access beyond our reasonable control, or loss of profits, data, or business opportunity. Where liability cannot be excluded, the total liability will not exceed the amount paid by the User for the service giving rise to the claim.</p>
      <h2>Disclaimer of Consequential Damages</h2>
      <p>AQ Links makes reasonable efforts to keep website information accurate and available, but does not guarantee that the website or its materials will always be uninterrupted, error-free, or suitable for every purpose. AQ Links will not be liable for loss of data, hardware damage, lost profits, or business interruption resulting from use of the website or its materials.</p>
      <h2>Cancellation and Refund Policy</h2>
      <p>Our focus is customer satisfaction. If you are dissatisfied with a service, contact us promptly with the relevant order details and the reason for your request. We will review genuine requests fairly based on the agreed scope, work already completed, and the circumstances of the case.</p>
      <h3>Cancellation</h3>
      <p>Cancellation requests should be submitted within 48 hours of order confirmation by emailing <a href="mailto:iamyousafkhan01@gmail.com">iamyousafkhan01@gmail.com</a> or using the Contact page. Once work has started or a service has been delivered, cancellation may not be possible or may be limited to the unfinished portion of the work.</p>
      <h3>Refunds</h3>
      <p>Approved refunds will normally be returned through the original payment method within 5 business days after approval. Refund eligibility depends on the service scope and the work already delivered. Third-party fees, completed work, or costs incurred specifically for an order may be non-refundable.</p>
      <h2>Contact</h2>
      <p>For questions about these Terms and Conditions, contact AQ Links:</p>
      <p><strong>Email:</strong> <a href="mailto:iamyousafkhan01@gmail.com">iamyousafkhan01@gmail.com</a><br /><strong>Phone:</strong> <a href="tel:+923056592499">+92-305-6592499</a><br /><strong>Address:</strong> Al Quresh Phase 1 Shershah road Multan.</p>
    </article>
  </main>
);

export default App;
