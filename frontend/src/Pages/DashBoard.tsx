import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function handleProjectAssignment(id:string){
  const response=await axios.put(`${BACKEND_URL}/projects/${id}`,{
    status:"On going"
  },{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  console.log(response.data);
}

async function handleProjectCompletion(id:string){
  const response=await axios.put(`${BACKEND_URL}/projects/${id}`,{
    status:"Completed"
  },{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })

  console.log(response.data);
}

const DashBoard = () => {
  const [projects, setProjects] = useState<[]>([]);
  const [myProjects,setMyProjects]=useState<[]>([]);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get(`${BACKEND_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();

    async function fetchUserProjects(){
      try{
        const response=await axios.get(`${BACKEND_URL}/projects/user`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        setMyProjects(response.data);
      }
      catch(error){
        console.error("Error fetching projects:",error);
      }
    }

    fetchUserProjects();

  }, [projects]);

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-red-600 text-white px-6 py-3 rounded-full mt-4 mx-4" onClick={()=>{
          localStorage.removeItem('token');
          navigate("/login")
        }}>Log Out</button>
      </div>
      <div className="projects-container">
        {projects.map((project: any) => (
          <div key={project.id} className="p-4 my-8 mx-4 bg-slate-400 rounded-md">
            <h2 className="font-bold text-3xl">{project.name}</h2>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            {project.candidateId ? (
              <p>Assigned to Candidate ID: {project.candidateId}</p>
            ) : (
              <button
                className="bg-green-200 rounded-lg p-2 my-2"
                onClick={() => {
                  handleProjectAssignment(project.id);
                }}
              >
                Take Project
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="my-8 mx-4">
        <div className="text-xl font-semibold mb-2">My Projects</div>
        <div className="h-[2px] bg-gray-300"></div>

        {myProjects.map((project: any) => (
          <div key={project.id} className="p-4 mt-4 bg-slate-400 rounded-md">
            <h2 className="font-bold text-3xl">{project.name}</h2>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            {project.status==="Completed"?(
              <p className="p-2 rounded-lg bg-cyan-600">Project Completed</p>
            ):(
              <button className="bg-green-200 rounded-lg p-2 my-2" onClick={()=>{handleProjectCompletion(project.id)}}>
                mark as done
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
  
};

export default DashBoard;
