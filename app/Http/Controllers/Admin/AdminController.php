<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;
use App\Models\User;
use App\Models\AdminsRole;

class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.dashboard');
    }

    public function login(Request $request)
    {
        if($request->isMethod('post'))
        {
            $data = [
                'username' => $request->input('user'),
                'password' => $request->input('password'),
            ];

            $rules = Validator::make($data, [
                'username' => 'required|string|max:255',
                'password' => 'required|max:20',
            ]);

            if($rules->fails())
            {
                return redirect()->back()->withErrors($rules);
            }

            if(Auth::guard('admin')->attempt($data))
            {
                return redirect("admin/dashboard");
            }
            else
            {
                redirect()->back()->with("error_message", "Invalid Username or Password!");
            }
        }
        return view('admin.login');
    }

    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect('admin/login');
    }

    public function updatePassword(Request $request)
    {
        if($request->isMethod('post'))
        {
            $data = $request->all();
            //Check if current password is correct or not
            if(Hash::check($data['current_pass'], Auth::guard('admin')->user()->password))
            {
                //Check if new password and confirm password are matching
                if($data['new_pass']==$data['confirm_pass'])
                {
                    //Update new password
                    Admin::where('id', Auth::guard('admin')->user()->id)->update(['password'=>bcrypt($data['new_pass'])]);
                    return redirect()->back()->with('success_message', 'Password has been updated successfully!');
                }
                else
                {
                    return redirect()->back()->with('error_message', 'New and Confirm Passwords are not matching!');
                }
            }
            else
            {
                return redirect()->back()->with('error_message', 'Your current password is incorrect!');
            }
        }
        return view('admin.update_password');
    }

    public function checkCurrentPass(Request $request)
    {
        $data = $request->all();
        if(Hash::check($data['current_pass'], Auth::guard('admin')->user()->password))
        {
            return "true";
        }
        else
        {
            return "false";
        }
    }

    public function updateAdmin(Request $request)
    {
        if($request->isMethod('post'))
        {
            $data = $request->all();

            $rules = Validator::make($data, [
                'admin_name' => 'required|max:255',
                'admin_username' => 'required|max:255',
                'admin_phone' => 'required|size:11',
            ]);

            if($rules->fails())
            {
                return redirect()->back()->withErrors($rules);
            }

            Admin::where('id', Auth::guard('admin')->user()->id)->update(['name'=>$data['admin_name'], 'username'=>$data['admin_username'], 'phone'=>$data['admin_phone']]);
            return redirect()->back()->with('success_message', 'Admin Details have been updated successfully!');
        }
        return view('admin.update_admin');
    }

    public function subadmins()
    {
        $subadmins = Admin::where('type', 'Moderator')
                ->orWhere('type', 'Finance-Admin')
                ->get();
        return view('admin.subadmin.subadmins')->with(compact('subadmins'));
    }

    public function updateSubadminStatus(Request $request)
    {
        if($request->ajax())
        {
            $data = $request->all();
            if($data['status']=="Active")
            {
                $status = 0;
            }
            else
            {
                $status = 1;
            }

            Admin::where('id', $data['subadmin_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status, 'subadmin_id'=>$data['subadmin_id']]);
        }
    }

    public function deleteSubadmin($id = null)
    {
        $subadmin = Admin::find($id);
        $subadmin->delete();
        $test = request('type');
        return redirect('admin/subadmins')->with('success_message', $test." is deleted successfully!");
    }

    public function addEditSubadmin(Request $request, $id = null)
    {
        if($id=="")
        {
            $title = "Add Sub-Admin";
            $subadmin = new Admin;
            $message = "Sub-Admin added successfully!";
        }
        else
        {
            $title = "Edit Sub-Admin";
            $subadmin = Admin::find($id);
            $message = "Sub-Admin updated successfully!";
        }

        if($request->isMethod('post'))
        {
            $data = $request->all();

            if($id=="")
            {
                $subadminCount = Admin::where('username', $data['username'])->count();
                if($subadminCount>0)
                {
                    return redirect()->back()->with('error_message', "Sub-Admin already exists!");
                }
            }

            $rules = Validator::make($data, [
                'name' => 'required',
                'username' => 'required',
                'type' => 'required',
                'email' => 'required',
                'phone' => 'required|size:11',
            ]);

            if($rules->fails())
            {
                return redirect()->back()->withErrors($rules);
            }

            if($id=="")
            {
                $subadmin->username = $data['username'];
                $subadmin->type = $data['type'];
                $subadmin->email = $data['email'];
            }
            $subadmin->name = $data['name'];
            $subadmin->phone = $data['phone'];
            if($data['password']!="")
            {
                $subadmin->password = bcrypt($data['password']);
            }
            $subadmin->status = 1;
            $subadmin->save();
            return redirect('admin/subadmins')->with('success_message', $message);
        }
        return view('admin.subadmin.add_edit_subadmin')->with(compact('title', 'subadmin'));
    }

    public function updateRole($id, Request $request)
    {
        if($request->isMethod('post'))
        {
            $data = $request->all();

            //Add new roles for Sub-Admins
            $modules = [
                'cms_pages' => ['cms', 'CMS Pages'],
                'users_info' => ['usersinfo', 'Users Information'],
                'payout' => ['payout', 'Payout Management']
            ];

            foreach ($modules as $module => $moduleInfo)
            {
                $moduleName = $moduleInfo[0];
                $moduleDisplayName = $moduleInfo[1];

                $view = isset($data[$moduleName . 'view']) ? $data[$moduleName . 'view'] : 0;
                $edit = isset($data[$moduleName . 'edit']) ? $data[$moduleName . 'edit'] : 0;
                $full = isset($data[$moduleName . 'full']) ? $data[$moduleName . 'full'] : 0;

                if ($view == 0 && $edit == 0 && $full == 0) {
                    AdminsRole::where(['subadmin_id' => $id, 'module' => $module])->delete();
                } else {
                    AdminsRole::where(['subadmin_id' => $id, 'module' => $module])->delete();
                    $role = new AdminsRole;
                    $role->subadmin_id = $id;
                    $role->module = $module;
                    $role->view_access = $view;
                    $role->edit_access = $edit;
                    $role->full_access = $full;
                    $role->save();
                }
            }

            $name = Admin::where('id', $id)->value('name');
            $message = $name." Role updated successfully!";
            return redirect()->back()->with('success_message', $message);
        }

        $subadminRoles = AdminsRole::where('subadmin_id', $id)->get()->toArray();
        $subadminDetails = Admin::where('id', $id)->first()->toArray();
        $title = "Update ".$subadminDetails['name']."'s Sub-Admin Roles/Permisssion";
        return view('admin.subadmin.update_role')->with(compact('title', 'id', 'subadminRoles'));
    }

    public function usersData()
    {
        $userData = User::all();

        //Set Permission for Users Information
        $userModuleCount = AdminsRole::where(['subadmin_id' => Auth::guard('admin')->user()->id, 'module' => 'users_info'])->count();
        $pagesModule = array();
        if (Auth::guard('admin')->user()->type == "Super-Admin") {
            $pagesModule['view_access'] = 1;
            $pagesModule['edit_access'] = 1;
            $pagesModule['full_access'] = 1;
        } else if ($userModuleCount == 0) {
            $msg = "This section is restricted";
            return redirect('admin/dashboard')->with('error_message', $msg);
        } else {
            $pagesModule = AdminsRole::where(['subadmin_id' => Auth::guard('admin')->user()->id, 'module' => 'users_info'])->first()->toArray();
        }
        return view('admin.pages.users_data')->with(compact('userData', 'pagesModule'));
    }

    public function deleteUser($id = null)
    {
        $userData = User::find($id);
        $userData->delete();
        return redirect('admin/users-data')->with('success_message', "User is deleted successfully!");
    }

    public function addEditUserData(Request $request, $id = null)
    {
        $title = "Edit User Information";
        $user = User::find($id);
        $message = "User Updated Successfully!";

        if($request->isMethod('post'))
        {
            $data = $request->all();

            $rules = Validator::make($data, [
                'name' => 'required',
                'email' => 'required',
                'phone' => 'required|size:11',
            ]);

            if($rules->fails())
            {
                return redirect()->back()->withErrors($rules);
            }

            if($id=="")
            {
                $user->email = $data['email'];
            }
            $user->name = $data['name'];
            $user->phone = $data['phone'];
            $user->save();
            return redirect('admin/users-data')->with('success_message', $message);
        }
        return view('admin.pages.edit_user_data')->with(compact('title', 'user'));
    }
}
