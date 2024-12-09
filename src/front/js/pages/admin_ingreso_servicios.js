import React, { useState, useEffect } from 'react';


const AdminAgendarServicio = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalCost, setTotalCost] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiculosRes = await fetch('/api/vehiculos');
        const serviciosRes = await fetch('/api/servicios');
        const clientesRes = await fetch('/api/clientes');
        const estadosRes = await fetch('/api/estados');
        setVehiculos(await vehiculosRes.json());
        setServicios(await serviciosRes.json());
        setClientes(await clientesRes.json());
        setEstados(await estadosRes.json());
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoServicio = {
      vehicle_ID: selectedVehicle,
      Service_Type_ID: selectedService,
      Status_ID: selectedStatus,
      Start_Date: startDate,
      End_Date: endDate,
      Total_Cost: totalCost,
      Payment_status: 'Pendiente',
      User_ID: selectedClient  // Asociar cliente con el servicio
    };

    try {
      const response = await fetch('/api/servicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoServicio)
      });

      if (response.ok) {
        alert('Servicio creado exitosamente');
      } else {
        alert('Error al crear servicio.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100"
    >
      <div
                className="card p-4"
                style={{ width: '1130px', height: '777px', backgroundColor: '#312E2D' }}
            >
              <div className="d-flex flex-column align-item-center position-relative"

                    
style={{ 
    width: ' 786px', 
    height: 'auto', 
    backgroundColor: '#143E79', 
    borderRadius: '20px', 
    margin: 'auto', 
    padding:"20px"}}>


                    {/*Icono retorno home*/}

                    <div onClick={""}
                        className='position-absolute d-flex justify-content-center align-items-center'
                        style={{
                            width: '40px', height: '40px', top: '10px', left: '10px', borderRadius: '50%',
                            cursor: 'pointer', border: '2px solid #FFFFFF', backgroundColor: '#143E79', zIndex: 1,
                        }}
                    >
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF' }}>X</span>


                    </div>
      
       <div className="card-body">
        
       <h2 className="text-white text-center mb-3">Agendar Servicio</h2>

      <form onSubmit={handleSubmit}>

      <div className="row">
        {/*Izquierda*/}
        <div className="col-md-6">

        <div className="mb-3">
          <label className="form-label text-white">Seleccionar Cliente</label>
          <select className="form-select" onChange={(e) => setSelectedClient(e.target.value)} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.first_name} {cliente.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 text-start">
          <label className="form-label text-white">Seleccionar Servicio</label>
          <select className="form-select" onChange={(e) => setSelectedService(e.target.value)} required>
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 text-start">
          <label className="form-label text-white">Fecha de Inicio</label>
          <input className="form-control"
            type="date" onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label text-white">Costo Total</label>
          <input
           className="form-control"
           type="num"
            onChange={(e) => setTotalCost(e.target.value)}
            required
          />
        </div>
        </div>
            {/* Derecha */}
            <div className="col-md-6">
       
        <div className="mb-3 text-start">
          <label className="form-label text-white">Seleccionar Vehículo</label>
          <select className="form-select" onChange={(e) => setSelectedVehicle(e.target.value)} required>
            <option className="form-select" value="">Seleccione un vehículo</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.id} value={vehiculo.id}>
                {vehiculo.brand} - {vehiculo.model}
              </option>
            ))}
          </select>
        </div>
        
        
        <div className="mb-3 text-start">
          <label className="form-label text-white">Seleccionar Estado</label>
          <select className="form-select" onChange={(e) => setSelectedStatus(e.target.value)} required>
            <option value="">Seleccione un estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.name}
              </option>
            ))}
          </select>
        </div>
        
        
        <div className="mb-3 text-start">
          <label className="form-label text-white">Fecha de Entrega</label>
          <input className="form-control"
            type="date" onChange={(e) => setEndDate(e.target.value)} required />
        </div>
      
       

        <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn fw-bold"
                                    style={{ backgroundColor: '#7ED957', width: '206px', height: '33px', color: 'white', textAlign: 'center', marginTop:'32px' }}
                                >
                                    Ingresar Servicio
                                </button>
                            </div>
                            </div>
                            </div>
      </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default AdminAgendarServicio;