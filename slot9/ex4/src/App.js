import React from "react";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "./components/MyForm";
import UserForm from "./components/UserForm";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const handleSubmitB2 = (data) => {
    console.log("Bài 2 - Dữ liệu đã gửi:", data);
    alert("Bài 2: Gửi form thành công!");
  };

  const handleSubmitB3 = (data) => {
    console.log("Bài 3 - Dữ liệu đã gửi:", data);
    alert("Bài 3: Gửi form thành công!");
  };

  const handleSubmitB4 = (data) => {
    console.log("Bài 4 - Dữ liệu đã gửi:", data);
    alert(` Đăng ký thành công!\n Tên: ${data.name}\n Tuổi: ${data.age}\n Email: ${data.email}\n SĐT: ${data.phone}`);
  };

  return (
    <div className="bg-light min-vh-100 py-4" style={{ overflowX: "hidden" }}>
      <div className="container">
        <div className="card shadow mb-5">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Bài 1 – UserProfile</h5>
          </div>
          <div className="card-body">
            <UserProfile name="Nguyễn Văn A" age={25} />
            <hr />
            <UserProfile name="" age={25} />
            <hr />
            <UserProfile name="Nguyễn Văn B" age="twenty five" />
            <hr />
            <UserProfile name="Nguyễn Văn C" age={null} />
          </div>
        </div>

        <div className="mb-5">
          <h4 className="mb-4">Bài 2 – UserProfile2</h4>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <UserProfile2 name="Nguyễn Văn A" age={25} onSubmit={handleSubmitB2} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <UserProfile2 name="Nguyễn Văn B" age="twenty five" onSubmit={handleSubmitB2} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <UserProfile2 name="" age={30} onSubmit={handleSubmitB2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-5">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Bài 3 – MyForm</h5>
          </div>
          <div className="card-body">
            <MyForm title="Đăng Ký Người Dùng (Bài 3)" onSubmit={handleSubmitB3} />
          </div>
        </div>

        <div className="card shadow mb-5">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Bài 4 – UserForm</h5>
          </div>
          <div className="card-body">
            <UserForm title="Form Đăng Ký Người Dùng (Bài 4)" onSubmit={handleSubmitB4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
