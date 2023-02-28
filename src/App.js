import { useState } from "react";
function App() {
  const initialValues = { height: "", weight: "", bmi: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = (
      formValues.weight / Math.pow(formValues.height / 100, 2)
    ).toFixed(2);
    formValues.bmi = result;

    if(result < 18.5)
    {
      setStatus("ideal kilonun altında");
    }
    else if(result >= 18.5 && result < 24.9)
    {
      setStatus("ideal kilodasınız");
    }
    else if(result >= 25 && result < 29.9)
    {
      setStatus("ideal kilo üstündesiniz");
    }
    else if( result >= 30 && result < 39.9)
    {
      setStatus("ideal kilonunun çok üstündesiniz(Obez)");
    }
    else if(result >= 40)
    {
      setStatus("ideal kilonunun çok üstündesiniz(Morbid Obez)");
    }
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.height) {
      errors.height = "Geçerli boy giriniz";
    }
    if (!values.weight) {
      errors.weight = "Geçerli kilo giriniz";
    }
    return errors;
  };


  return (
    <div className="container">
      <h3 className="text-center">VÜCUT KİTLE ENDEKSİ HESAPLA</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Kilo(kg)
          </label>
          <input
            type="number"
            className="form-control"
            name="weight"
            placeholder="Kilonuz"
            value={formValues.weight}
            onChange={handleChange}
          />
        <p className="error">{formErrors.weight}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Boy(cm)
          </label>
          <input
            type="number"
            className="form-control"
            name="height"
            placeholder="Boyunuz"
            value={formValues.height}
            onChange={handleChange}
          />
        <p className="error">{formErrors.height}</p>
        </div>

        <div className="mb-3">
          Vücut kitle endeksiniz:
          {(Object.keys(formErrors).length === 0) ? (
            <div>
              {`${formValues.bmi}-${status}`}
            </div>
          ) : (
            <div className="error">Alanları doldurun</div>
          )}
        </div>

        <button type="submit" onClick={handleSubmit} className="btn btn-primary m-auto d-block">
          Hesapla
        </button>
      </form>
    </div>
  );
}

export default App;
