import React, { useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    if (usuario.tipo !== "A") {
      navigate("/cadastro");
    }
  }, [usuario, navigate]);

  if (!usuario || usuario.tipo !== "A") return null;

  const PRIMARY_COLOR = "#007bff"; 
  const LIGHT_GRAY = "#f8f9fa";

  const DOUGHNUT_COLORS = {
    TEC: "#1e88e5",
    FIN: "#43a047",
    MAR: "#546e7a",
    SAU: "#aed581",
  };
  
  const lineData = {
    labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
    datasets: [
      {
        label: "Inscrições por Semana",
        data: [250, 310, 450, 420, 580, 610],
        fill: true,
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        borderColor: PRIMARY_COLOR,
        pointBackgroundColor: PRIMARY_COLOR,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Tecnologia", "Finanças", "Marketing", "Saúde"],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          DOUGHNUT_COLORS.TEC,
          DOUGHNUT_COLORS.FIN,
          DOUGHNUT_COLORS.MAR,
          DOUGHNUT_COLORS.SAU,
        ],
        hoverBackgroundColor: [
          DOUGHNUT_COLORS.TEC,
          DOUGHNUT_COLORS.FIN,
          DOUGHNUT_COLORS.MAR,
          DOUGHNUT_COLORS.SAU,
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Tendência de Inscrições: Últimas 6 Semanas",
        align: 'start',
        font: { size: 16, weight: 'bold' },
        color: '#343a40'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6c757d' }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e9ecef' },
        ticks: { color: '#6c757d' }
      },
    },
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: '#6c757d'
        }
      },
      title: {
        display: true,
        text: "Distribuição por Categoria (%)",
        align: 'center',
        font: { size: 14, weight: 'bold' },
        color: '#343a40'
      }
    },
    cutout: '70%',
  };

  const nextEvents = [
    { name: "Web Summit 2026", date: "15/03/2026", status: "Próximo", color: "info" },
    { name: "Feira de Negócios SP", date: "02/04/2026", status: "Confirmado", color: "success" },
    { name: "Hackathon Dev", date: "18/04/2026", status: "Em Risco", color: "warning" },
    { name: "Conferência Global", date: "10/05/2026", status: "Em Planejamento", color: "secondary" },
  ];

  return (
    <div className="content-area flex-grow-1 p-5" style={{ backgroundColor: LIGHT_GRAY }}>
      <h2 className="mb-4 text-dark fw-light border-bottom pb-2">Dashboard de Análise de Mercado</h2>

      <div className="row g-3 mb-5"> 
        {[
          { title: "Eventos Ativos", value: 14, percent: "+5", color: "primary", icon: "bi-calendar-check" },
          { title: "Participantes Únicos", value: "8.1K", percent: "9.5%", color: "success", icon: "bi-people" },
          { title: "Taxa de Ocupação Média", value: "85%", percent: "+1.2%", color: "warning", icon: "bi-graph-up" },
          { title: "ROI (Último Trimestre)", value: "25%", percent: "-3%", color: "danger", icon: "bi-currency-dollar" },
        ].map((card, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
            <div className="card h-100 border-0 shadow-sm rounded-lg p-3 bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <div className={`text-${card.color}`}>
                  <i className={`bi ${card.icon} fs-3`}></i>
                </div>
                <div>
                  <h6 className="text-muted text-uppercase mb-0" style={{ fontSize: "0.75rem" }}>
                    {card.title}
                  </h6>
                  <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.8rem" }}>{card.value}</h3>
                </div>
              </div>
              <p className="text-muted mb-0 mt-2" style={{ fontSize: "0.8rem" }}>
                <span className={`fw-bold text-${card.percent.includes('+') ? 'success' : 'danger'}`}>
                  {card.percent}
                </span>
                <span className="ms-1"> vs Mês Passado</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-5">
        
        <div className="col-lg-8"> 
          <div className="card shadow-lg border-0 h-100 bg-white">
            <div className="card-body" style={{ height: "400px" }}>
              <Line data={lineData} options={lineOptions} /> 
            </div>
          </div>
        </div>
        
        <div className="col-lg-4"> 
          <div className="card shadow-lg border-0 h-100 bg-white">
            <div className="card-body d-flex flex-column" style={{ height: "400px" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0 bg-white">
            <div className="card-header bg-light border-0 py-3">
              <h5 className="mb-0 fw-semibold text-dark">Próximos Eventos e Status</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {nextEvents.map((event, index) => (
                  <li 
                    key={index} 
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                        <span className="fw-medium text-dark">{event.name}</span>
                        <small className="text-muted d-block">{event.date}</small>
                    </div>
                    <span className={`badge bg-${event.color}-light text-${event.color} p-2 fw-bold`}>
                      {event.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;