import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth'
import './Header.css'

import currency from '../constants/currency'

const Header = () => {
  const { setProfile } = useContext(UserContext)
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
  })

  const [localProfile, setLocalProfile] = useState(null)

  useEffect(() => {
    // Convert objects to strings to compare them
    const currentProfileStr = JSON.stringify(profile)
    const localProfileStr = JSON.stringify(localProfile)

    // Only update if the stringified versions differ
    if (currentProfileStr !== localProfileStr) {
      const key = profile?.country?.toLowerCase().replace(/[^\p{L}\p{M}]/gu, '')
      if (currency[key]) {
        profile.currency = currency[key].Currency
        profile.countryCode = currency[key].Code.toLowerCase()
      }
      setLocalProfile(profile)
      setProfile(profile) // assuming setProfile comes from a context and is stable
    }
  }, [profile])

  const logout = () => {
    handleLogout()
    window.location.href = '/'
  }

  const renderLoginState = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (error) {
      handleLogout()
      return (
        <div>
          <p>Unable to load user data. Please try again later.</p>
        </div>
      )
    }
    if (profile) {
      return (
     <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>
        Welcome, {profile.givenName}
      </span>
      {
        profile.picture &&
        <img src={profile.picture} alt="profile picture" width="25" height="25" style={{ margin: "0 5px", borderRadius: "50%" }} />
      }
     <button onClick={logout}>Logout</button>
     </div>
      )
    }

    return <AffinidiLoginButton />
  }

  return (
    <header className="Header">
   <Link to="/">
     <h1>
        StackShop&nbsp;
        {localProfile?.countryCode && (<picture>
          <source
            type="image/webp"
            srcset={`https://flagcdn.com/32x24/${localProfile?.countryCode}.webp,
              https://flagcdn.com/64x48/${localProfile?.countryCode}.webp 2x,
              https://flagcdn.com/96x72/${localProfile?.countryCode}.webp 3x`}/>
          <source
            type="image/png"
            srcset={`https://flagcdn.com/32x24/${localProfile?.countryCode}.png,
              https://flagcdn.com/64x48/${localProfile?.countryCode}.png 2x,
              https://flagcdn.com/96x72/${localProfile?.countryCode}.png 3x`}/>
          <img
            src={`https://flagcdn.com/32x24/${localProfile?.countryCode}.png`}
            width="32"
            height="24"
            alt={localProfile?.country}/>
        </picture>)}
      </h1>

   </Link>
   <nav>
     {renderLoginState()}
     <Link to="/cart" className="CartIcon">
       <img src="/cart.png" alt="Cart"/>
     </Link>
   </nav>
    </header>
  )
}

export default Header
