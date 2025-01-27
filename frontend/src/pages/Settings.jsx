// pages/Settings.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Settings = () => {
 const { user } = useAuth();
 const [saved, setSaved] = useState(false);
 const [form, setForm] = useState({
   email: user?.email || '',
   username: user?.username || '',
   notificationsEnabled: true,
   theme: 'light',
   language: 'en'
 });

 const themeOptions = [
   { value: 'light', label: 'Light' },
   { value: 'dark', label: 'Dark' }
 ];

 const languageOptions = [
   { value: 'en', label: 'English' },
   { value: 'es', label: 'Spanish' },
   { value: 'fr', label: 'French' }
 ];

 const handleSubmit = async (e) => {
   e.preventDefault();
   // API call will go here
   setSaved(true);
   setTimeout(() => setSaved(false), 3000);
 };

 return (
   <div className="min-h-screen bg-green-50 py-8">
     <div className="max-w-4xl mx-auto px-6">
       <h1 className="text-3xl font-semibold text-green-800 mb-8">Settings ⚙️</h1>

       <div className="space-y-6">
         {/* Profile Settings */}
         <Card variant="bordered" className="p-8">
           <h2 className="text-2xl text-green-700 mb-6">Profile Settings</h2>
           <form onSubmit={handleSubmit} className="space-y-6">
             <Input
               label="Username"
               value={form.username}
               onChange={(e) => setForm({ ...form, username: e.target.value })}
             />
             <Input
               label="Email"
               type="email"
               value={form.email}
               onChange={(e) => setForm({ ...form, email: e.target.value })}
             />
             <Button type="submit" variant="primary" size="lg">
               Save Changes
             </Button>
           </form>
         </Card>

         {/* Preferences */}
         <Card variant="bordered" className="p-8">
           <h2 className="text-2xl text-green-700 mb-6">Preferences</h2>
           <div className="space-y-6">
             <Select
               label="Theme"
               options={themeOptions}
               value={form.theme}
               onChange={(e) => setForm({ ...form, theme: e.target.value })}
             />
             <Select
               label="Language"
               options={languageOptions}
               value={form.language}
               onChange={(e) => setForm({ ...form, language: e.target.value })}
             />
             <div className="flex items-center">
               <input
                 type="checkbox"
                 id="notifications"
                 checked={form.notificationsEnabled}
                 onChange={(e) => setForm({ ...form, notificationsEnabled: e.target.checked })}
                 className="rounded border-green-300 text-green-600 focus:ring-green-500"
               />
               <label htmlFor="notifications" className="ml-2 text-green-700">
                 Enable Notifications
               </label>
             </div>
           </div>
         </Card>

         {/* Privacy Settings */}
         <Card variant="bordered" className="p-8">
           <h2 className="text-2xl text-green-700 mb-6">Privacy</h2>
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="text-lg font-medium text-green-800">Profile Visibility</h3>
                 <p className="text-green-600 text-sm">Allow others to see your progress</p>
               </div>
               <label className="switch">
                 <input type="checkbox" className="sr-only peer" />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                               peer-checked:after:translate-x-full peer-checked:after:border-white 
                               after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                               after:bg-white after:border-gray-300 after:border after:rounded-full 
                               after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600">
                 </div>
               </label>
             </div>
           </div>
         </Card>

         {/* Account Danger Zone */}
         <Card variant="bordered" className="p-8">
           <h2 className="text-2xl text-red-600 mb-6">Danger Zone</h2>
           <div className="space-y-4">
             <Button variant="outline" className="text-red-600 border-red-600">
               Delete Account
             </Button>
           </div>
         </Card>
       </div>

       {saved && (
         <Alert type="success" message="Settings saved successfully!" className="mt-4" />
       )}
     </div>
   </div>
 );
};

export default Settings;