import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const Dashboard = () => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
       <h1>Dashboard</h1>
        {/* Cards */}
        {/* Tables */}
        {/* Charts */}
      </div>
    </main>
  )
}

export default Dashboard