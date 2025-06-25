import React from 'react'
import { Outlet, redirect } from 'react-router'
import {SidebarComponent} from '@syncfusion/ej2-react-navigations'
import { NavItem } from 'components'
import MobileSidebar from 'components/MobileSidebar'
import { account } from '~/appwrite/cilent'
import { getExistingUser,storeUserData } from '~/appwrite/auth'
 
 export async function clientLoader() {
  try {
    const User =await account.get();
    if(!User.$id)return redirect('/')

      const existingUser=await getExistingUser(User.$id)

      if(existingUser ?.status==='User'){
        return redirect('/')
      }

      return existingUser ?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log('Error in cilentLoader',error)
    return redirect ('/SignIn')
  }
   
 }

const Layout = () => {
  return (
    <div className='admin-layout'>
        <MobileSidebar/>
        <aside className='w-full max-w-[270px] hidden lg:block'>
          <SidebarComponent width={270} enableGestures={false}>
              <NavItem />
          </SidebarComponent>
        </aside>
        <aside className='children'>
            <Outlet/>
        </aside>
    </div>
  )
}

export default Layout