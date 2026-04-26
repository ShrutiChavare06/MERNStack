import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  FaBirthdayCake,
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChartBar,
  FaUsers,
  FaStar,
  FaCrown,
  FaHeart
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {

 const { user, logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
   logout();
   toast.success('See you soon! 🎂');
   navigate('/login');
 };

 const isAdmin = user?.role === 'admin';

 const containerVariants = {
   hidden: { opacity:0 },
   visible:{
     opacity:1,
     transition:{
       staggerChildren:0.1,
       delayChildren:0.2
     }
   }
 };

 const cardVariants = {
   hidden:{ opacity:0, y:30 },
   visible:{
     opacity:1,
     y:0,
     transition:{
       duration:0.5,
       ease:'easeOut'
     }
   }
 };

 const userStats = [
   {
    icon:FaHeart,
    label:'Favourites',
    value:'12',
    color:'#f43f5e'
   },
   {
    icon:FaStar,
    label:'Reviews',
    value:'5',
    color:'#f59e0b'
   },
   {
    icon:FaBirthdayCake,
    label:'Orders',
    value:'8',
    color:'#ec4899'
   }
 ];

 const adminStats = [
   {
    icon:FaUsers,
    label:'Total Users',
    value:'248',
    color:'#6366f1'
   },
   {
    icon:FaChartBar,
    label:'Orders Today',
    value:'34',
    color:'#ec4899'
   },
   {
    icon:FaStar,
    label:'Avg Rating',
    value:'4.9',
    color:'#f59e0b'
   },
   {
    icon:FaBirthdayCake,
    label:'Cakes Made',
    value:'1.2k',
    color:'#10b981'
   }
 ];

 const stats = isAdmin ? adminStats : userStats;

 return (
<div className={`dashboard-page ${isAdmin ? 'admin-theme':'user-theme'}`}>

<div className="dashboard-bg"/>

<motion.div
 className="dashboard-container"
 variants={containerVariants}
 initial="hidden"
 animate="visible"
>

<motion.div
 className={`welcome-hero ${isAdmin ? 'admin-hero':'user-hero'}`}
 variants={cardVariants}
>

<div className="welcome-left">

<div className={`avatar-circle ${isAdmin ? 'admin-avatar':'user-avatar'}`}>
 {isAdmin ? <FaCrown/> : <FaUser/>}
</div>

<div className="welcome-text">
<div className={`role-badge-large ${isAdmin ? 'admin':'user'}`}>
 {isAdmin ? '👑 Administrator':'🧁 Customer'}
</div>

<h1 className="welcome-heading">
Welcome back,
<br/>
<span className="username-highlight">
 {user?.firstName} {user?.lastName}
</span>
!
</h1>

<p className="welcome-sub">
{isAdmin
?'Manage your bakery empire from here. Everything looks delicious!'
:'Ready to explore our sweet creations? Your cake journey continues!'
}
</p>

</div>
</div>

<div className="welcome-emoji-big">
 {isAdmin ? '🎂':'🧁'}
</div>

</motion.div>


<motion.div
 className="stats-grid"
 variants={containerVariants}
>
{stats.map((stat,i)=>(
<motion.div
 key={i}
 className="stat-card"
 variants={cardVariants}
 whileHover={{y:-5,scale:1.02}}
>

<div
 className="stat-icon"
 style={{
 background:`${stat.color}20`,
 color:stat.color
 }}
>
<stat.icon/>
</div>

<div className="stat-value">
 {stat.value}
</div>

<div className="stat-label">
 {stat.label}
</div>

</motion.div>
))}
</motion.div>


<motion.div
 className="info-grid"
 variants={containerVariants}
>

<motion.div
 className="info-card"
 variants={cardVariants}
>

<h3 className="info-card-title">
<FaUser className="info-card-icon"/>
Account Details
</h3>

<div className="info-list">

<div className="info-row">
<div className="info-label">
<FaUser className="info-icon"/>
Full Name
</div>

<div className="info-value">
{user?.firstName} {user?.lastName}
</div>
</div>

<div className="info-row">
<div className="info-label">
<FaEnvelope className="info-icon"/>
Email
</div>

<div className="info-value">
{user?.email}
</div>
</div>

<div className="info-row">
<div className="info-label">
<FaShieldAlt className="info-icon"/>
Role
</div>

<div className="info-value">
<span className={`role-pill ${user?.role}`}>
{user?.role==='admin' ? '👑 Admin':'🧁 User'}
</span>
</div>
</div>

<div className="info-row">
<div className="info-label">
<FaCalendarAlt className="info-icon"/>
Member Since
</div>

<div className="info-value">
{
new Date().toLocaleDateString(
'en-US',
{
month:'long',
year:'numeric'
}
)
}
</div>
</div>

</div>
</motion.div>



<motion.div
 className={`panel-card ${isAdmin?'admin-panel':'user-panel'}`}
 variants={cardVariants}
>

{isAdmin ? (
<>
<h3 className="info-card-title">
<FaChartBar className="info-card-icon"/>
Admin Panel
</h3>

<div className="admin-actions">

{[
{
label:'🧑‍🤝‍🧑 Manage Users',
desc:'View and manage customers'
},
{
label:'🎂 Cake Catalog',
desc:'Add or update cakes'
},
{
label:'📦 Order Queue',
desc:'Process orders'
},
{
label:'📊 Analytics',
desc:'View performance'
}
].map((action,i)=>(
<motion.div
 key={i}
 className="admin-action-item"
 whileHover={{x:4}}
>

<div>
<div className="action-label">
{action.label}
</div>

<div className="action-desc">
{action.desc}
</div>
</div>

<span className="action-arrow">
›
</span>

</motion.div>
))}

</div>
</>
):(
<>
<h3 className="info-card-title">
<FaHeart className="info-card-icon"/>
Your Sweet Corner
</h3>

<div className="user-highlights">

{[
{
emoji:'🎂',
title:'Birthday Cakes',
desc:'Perfect for celebrations'
},
{
emoji:'🧁',
title:'Cupcakes',
desc:'Mini delights'
},
{
emoji:'🍰',
title:'Pastries',
desc:'Fresh daily'
},
{
emoji:'🍫',
title:'Desserts',
desc:'Sweet treats'
}
].map((item,i)=>(
<motion.div
 key={i}
 className="highlight-item"
 whileHover={{scale:1.03}}
>

<span className="highlight-emoji">
{item.emoji}
</span>

<div>
<div className="highlight-title">
{item.title}
</div>

<div className="highlight-desc">
{item.desc}
</div>
</div>

</motion.div>
))}

</div>
</>
)}

</motion.div>

</motion.div>


<motion.div
 className="logout-section"
 variants={cardVariants}
>

<motion.button
 className="logout-btn-large"
 onClick={handleLogout}
 whileHover={{scale:1.03}}
 whileTap={{scale:0.97}}
>
<FaSignOutAlt/>
Sign Out
</motion.button>

</motion.div>

</motion.div>
</div>
 );
};

export default Dashboard;