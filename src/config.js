export default {
  serverPort: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/phonebook',
  jwtSecret: 'sdvkajfdvadjfvjgfjlagfdkgfdk;',
  adminUser: { name: 'admin', email: 'admin@admin.com', password: 'password' },
};
