import { Link } from "react-router-dom"
import { Button } from "../../Components/ui/button"
import Navbar from "../../Components/Navbar/Navbar"
import img from "../../assets/hero-img.jpg"

export default function Hero() {
  return (
    <div>
        <Navbar/> 
        <div className="d-flex justify-content-center align-items center">
        <section className="flex  flex-col md:flex-row items-center justify-between bg-white py-12 px-4 md:px-8" >
      <div className="flex-1 max-w-lg mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-6">Welcome to College Tournament</h1>
        <p className="text-lg mb-6">
          Discover our streamlined scoring system for college tournaments. From sports to academics, our solution
          ensures fair and accurate results for individual and team competitions.
        </p>
        <Button className="bg-[#22c55e] text-white"><Link to={localStorage.getItem("token") ? "/events": "/login"}>explore events</Link></Button>
      </div>
      <div className="flex-1 ">
        <img alt="People running uphill towards their dreams" className="max-w h-auto" src={img} />
      </div>
    </section>
    </div>
    </div>
  )
}

