import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../public/assets/images/logo.svg'
import Logout from '../../../public/assets/icons/logout.svg'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'
import { useEffect } from 'react'


const Topbar = () => {

    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isSuccess){  
            navigate(0)
        }
    },[isSuccess])
  return (    
    <section className='topbar'>
        <div className="flex-between py-4 px-5">
            <Link to="/" className='flex gap-3 items-center'>
                <img 
                    src={Logo}
                    alt="logo"
                    height={325}
                    width={130}
                />
            </Link>
            <div className='flex gap-4'>
                <Button 
                    variant="ghost" 
                    className='shad-button_ghost' 
                    onClick={()=>signOut()}
                >
                    <img 
                        src={Logout}
                        alt="logout"
                    />
                </Button>
            </div>
        </div>
    </section>
  )
}

export default Topbar