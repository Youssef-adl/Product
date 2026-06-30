const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@solarislux.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@solarislux.com',
      password: await hash('password', 12),
      role: 'admin',
    },
  });

  const products = [
    { name: 'SmartCharge V1 (Edition Titane)', description: "L'unité phare avec recharge 15W et dissipateur thermique ionique.", price: 249.0, category: 'UNITÉ PRINCIPALE', stock: 500, sku: 'SL-V1-TITAN', spec: 'TITANE G5 USINÉ', imageUrl: '/product-v1.png' },
    { name: 'Câble Solaris Precision (2m)', description: 'Conductivité maximale pour une charge sans perte thermique.', price: 39.0, category: 'ACCESSOIRE', stock: 1200, sku: 'SL-ACC-CABLE', spec: 'TRESSAGE ARAMIDE', imageUrl: '/product-cable.png' },
    { name: 'Support Stasis v2', description: "Angle de vue optimisé à 45° pour un usage bureau.", price: 89.0, category: 'ACCESSOIRE', stock: 800, sku: 'SL-ACC-STAND', spec: 'ALUMINIUM AÉRONAUTIQUE', imageUrl: '/product-stasis.png' },
    { name: 'Adaptateur Mural 45W Plus', description: 'Énergie ultra-compacte avec protection contre les surtensions.', price: 79.0, category: 'ACCESSOIRE', stock: 1500, sku: 'SL-ACC-WALL', spec: 'GAN TECHNOLOGY', imageUrl: '/product-gan.png' },
    { name: 'Pack Complet Solaris', description: "L'expérience Solaris Lux complète.", price: 399.0, category: 'BUNDLES', stock: 300, sku: 'SL-BUN-ULTIMATE', spec: 'KIT COMPLET', imageUrl: '/product-bundle.png' },
  ];

  for (const product of products) {
    await prisma.product.upsert({ where: { sku: product.sku }, update: product, create: product });
  }

  console.log('Seed completed');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
