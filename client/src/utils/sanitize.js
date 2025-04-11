// Hàm sanitize đơn giản để loại bỏ các thẻ HTML và JavaScript
export const sanitizeHTML = (str) => {
  if (!str) return '';

  // Thay thế các ký tự đặc biệt
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Hàm kiểm tra và lọc input
export const validateInput = (input) => {
  if (!input) return '';

  // Loại bỏ các thẻ script và các thuộc tính on*
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/on\w+=[^ >]+/g, '');
};
