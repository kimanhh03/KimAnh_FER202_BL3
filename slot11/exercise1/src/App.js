import ProfileForm from './ProfileForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;