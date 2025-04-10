import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { localStorageHelper } from '@/helper/storageHelper';
import { PAGES } from '@/constants/PagesName';


const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(()  => {

    console.log("login data called")
    const isLoggedIn =  localStorageHelper.getItem('login_data');

    console.log("login data", isLoggedIn)

    if (!isLoggedIn) {
        router.push(PAGES.LOGIN, { replace: true });
      }
   setTimeout(()=> {
    
   }, 3000) 

}, [router]);
};

export default useAuthRedirect;
