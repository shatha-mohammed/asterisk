// import axios from 'axios';

// // هذا الملف مسؤول عن كل طلبات البيانات المالية بناءً على الـ Endpoints المحددة [cite: 1]
// const API_URL = '/api';

// export const financeService = {
//   // 1. جلب إحصائيات لوحة التحكم والتقارير [cite: 1]
//   // تعيد بيانات مثل: totalRevenue, pendingPayments, activeProjectsCount, totalExpenses, monthlyData 
//   getDashboardStats: async () => {
//     const response = await axios.get(`${API_URL}/dashboard/stats`);
//     return response.data;
//   },

//   // 2. إدارة الفواتير (Invoices) [cite: 1]
//   getAllInvoices: async () => {
//     const response = await axios.get(`${API_URL}/invoices`);
//     return response.data;
//   },

//   // إضافة فاتورة جديدة (تتطلب projectId, clientId, amount, dueDate) [cite: 2]
//   createInvoice: async (invoiceData) => {
//     const response = await axios.post(`${API_URL}/invoices`, invoiceData);
//     return response.data;
//   },

//   // تحديث حالة الفاتورة (مثلاً من pending إلى paid) [cite: 2]
//   updateInvoice: async (id, updateData) => {
//     const response = await axios.patch(`${API_URL}/invoices/${id}`, updateData);
//     return response.data;
//   },

//   // 3. إدارة المصاريف (Expenses) [cite: 1]
//   getExpenses: async () => {
//     const response = await axios.get(`${API_URL}/expenses`);
//     return response.data;
//   },

//   // إضافة مصروف جديد (يتطلب title, amount, date) [cite: 2]
//   createExpense: async (expenseData) => {
//     const response = await axios.post(`${API_URL}/expenses`, expenseData);
//     return response.data;
//   },

//   // حذف مصروف [cite: 3]
//   deleteExpense: async (id) => {
//     const response = await axios.delete(`${API_URL}/expenses/${id}`);
//     return response.data;
//   }
// };