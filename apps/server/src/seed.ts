import bcrypt from 'bcrypt';
import { prisma } from './lib/db.js';

const count = await prisma.admin.count();
if (count > 0) {
  console.log('❌ Users already exist, skipping seed.');
} else {
  const email = 'admin@gmail.com';
  const password = 'password';
  await prisma.admin.create({
    data: {
      fullName: 'One Admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash(password, 10),
    },
  });
  console.log('✅ Admin user created');
  console.log(`○ Email: ${email}`);
  console.log(`○ Password: ${password}`);
}
