'use client';

import { useState } from 'react';

import { PackageSearch } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { BadgePoundSterling } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { UserSearch } from "lucide-react";
import { FileClock } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Link from 'next/link';

export default function ManageUsers() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    letterSubscription: false,
    role: 'user', //Could be "user", "admin", "moderator"
    status: 'active',
    registrationDate: ''
  });



  return (
    <main>
      <div className="page">
        <div className="page-container">
          <section className="admin-sidenav">
            <nav className="admin-nav">
              <ul>
                <li>
                  <a href="/admin-panel">
                    <LayoutDashboard />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/products">
                    <PackageSearch />
                    Manage Products
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-add-new-product">
                    <PackagePlus />
                    Add Product
                  </a>
                </li>
                <li>
                  <a href="/admin/analytics">
                    <BadgePoundSterling />
                    Sales Analytics
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-manage-users">
                    <UserRoundCog />
                    Manage Users
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-user-audit">
                    <UserSearch />
                    User Audit
                  </a>
                </li>
                <li>
                  <a href="/admin-panel/admin-edit-log">
                    <FileClock />
                    Admin Edit Log
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          
          <section className="admin-panel">
          <section className="admin-users-header">

        <h2>User Audit</h2>

          <div className="admin-users-actions">

            <Link href="/admin-panel/admin-manage-users">
              <button type="button" className="admin-users-button">Manage Users</button>
            </Link> 


          </div>
            
        </section>

<table className='admin-users-table'>

  <thead>

    <tr>
      <th>Date & Time</th>
      <th>Email</th>
      <th>Action</th>
      <th>Details</th>
      <th>Status</th>

    </tr>

  </thead>


  <tbody>

    <tr>

      <td>13 Apr 2026, 18:13</td>
      <td>john@gmail.com</td>
      <td>Created Order</td>
      <td>Oder #AB-123, Total: £30.50</td>
      <td>Success</td>
   
      
      
      

    </tr>



    <tr>


   
      <td>13 Apr 2026, 17:56</td>
      <td>john@gmail.com</td>
      <td>Login</td>
      <td>Successful login from Chrome</td>
      <td>Success</td>
      
      

    </tr>


    
    <tr>


      <td>12 Apr 2026, 12:20</td>
      <td>mike@gmail.com</td>
      <td>Updated Profile</td>
      <td>Subscribed to the newsletter</td>
      <td>Success</td>   
      
      
      

    </tr>


    
    <tr>


   
      <td>12 Apr 2026, 12:16</td>
      <td>mike@gmail.com</td>
      <td>Updated Profile</td>
      <td>Changed password</td>
      <td>Success</td>   
      
      

    </tr>


    
    <tr>

      <td>12 Apr 2026, 12:10</td>
      <td>mike@gmail.com</td>
      <td>Login</td>
      <td>Successful login from Edge</td>
      <td>Success</td> 
   
      
      
      

    </tr>


    
    <tr>

      <td>10 Apr 2026, 15:46</td>
      <td>sarah@gmail.com</td>
      <td>Registered</td>
      <td>New account registration</td>
      <td>Success</td>
   
      
      
      

    </tr>

        
    <tr>

      <td>9 Apr 2026, 10:03</td>
      <td>tom@gmail.com</td>
      <td>Login</td>
      <td>Successful login from Chrome</td>
      <td>Failed</td>
   
      
      
      

    </tr>

  </tbody>

</table>





          </section>
        </div>
      </div>
    </main>
  );





























}