import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-auto">

                    <h1 className='text-center py-5'>ICI HOME / FRONT DE LIONNEL</h1>

                    <Link to="/login">
                        <button className="btn btn-primary"> Go to Login</button>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Home