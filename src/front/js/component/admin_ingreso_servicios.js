import React, { useState, useEffect } from 'react';

const AdminAgendarServicio = ({ isOpen, onClose }) => {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vehiculosRes, serviciosRes, clientesRes, estadosRes] = await Promise.all([
          fetch('/api/vehiculos'),
          fetch('/api/servicios'),
          fetch('/api/clientes'),
          fetch('/api/estados'),
        ]);

        if (!vehiculosRes.ok || !serviciosRes.ok || !clientesRes.ok || !estadosRes.ok) {
          throw new Error('Error al cargar datos');
        }

        setVehiculos(await vehiculosRes.json());
        setServicios(await serviciosRes.json());
        setClientes(await clientesRes.json());
        setEstados(await estadosRes.json());
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar datos, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setSelectedClient('');
    setSelectedVehicle('');
    setSelectedService('');
    setSelectedStatus('');
    setStartDate('');
    setEndDate('');
    setTotalCost('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClient || !selectedVehicle || !selectedService || !selectedStatus || !startDate || !endDate || !totalCost) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const nuevoServicio = {
      vehicle_ID: selectedVehicle,
      Service_Type_ID: selectedService,
      Status_ID: selectedStatus,
      Start_Date: startDate,
      End_Date: endDate,
      Total_Cost: totalCost,
      Payment_status: 'Pendiente',
      User_ID: selectedClient,
    };

    try {
      const response = await fetch('/api/servicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoServicio),
      });

      if (!response.ok) throw new Error('Error al crear servicio.');

      alert('Servicio creado exitosamente');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error inesperado.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-fade" id="modalAgendarAdmin" tabIndex="-1" aria-labelledby="modalAgendarAdminLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: '#312E2D' }}>
          <div className="modal-header" style={{ backgroundColor: '#143E79' }}>
            <h2 className="text-white" id="modalAgendarAdminLabel">Agendar Servicio</h2>
            <button className="close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p className="text-white">Cargando datos...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-white">Seleccionar Cliente</label>
                      <select className="form-select" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                          <option key={cliente.id} value={cliente.id}>{cliente.first_name} {cliente.last_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Seleccionar Servicio</label>
                      <select className="form-select" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
                        <option value="">Seleccione un servicio</option>
                        {servicios.map((servicio) => (
                          <option key={servicio.id} value={servicio.id}>{servicio.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Fecha de Inicio</label>
                      <input className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Costo Total</label>
                      <input className="form-control" type="number" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-white">Seleccionar Vehículo</label>
                      <select className="form-select" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} required>
                        <option value="">Seleccione un vehículo</option>
                        {vehiculos.map((vehiculo) => (
                          <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.brand} - {vehiculo.model}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Seleccionar Estado</label>
                      <select className="form-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} required>
                        <option value="">Seleccione un estado</option>
                        {estados.map((estado) => (
                          <option key={estado.id} value={estado.id}>{estado.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-white">Fecha de Entrega</label>
                      <input className="form-control" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#7ED957', color: 'white' }}>Ingresar Servicio</button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAgendarServicio;
