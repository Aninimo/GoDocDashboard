import prismadb from '../lib/prismadb'

interface GraphData {
  name: string;
  total: number;
}

export const getGraph = async (userId: string): Promise<GraphData[]> => {
  const patients = await prismadb.patient.findMany({
    where: {
      userId 
    }
  })

  const monthlyPatientCount: { [key: number]: number } = {}

  for (const patient of patients){
    const month = patient.createdAt.getMonth()

    monthlyPatientCount[month] = (monthlyPatientCount[month] || 0) + 1;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ]

  for (const month in monthlyPatientCount) {
    graphData[parseInt(month)].total = monthlyPatientCount[parseInt(month)];
  }

  return graphData
}
