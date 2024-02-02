import { Link } from 'react-router-dom'
import Logo from '../../../public/assets/images/logo.svg'
import Logout from '../../../public/assets/icons/logout.svg'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'


const Topbar = () => {

    const {mutate: signOut, isSuccess} = useSignOutAccount()

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