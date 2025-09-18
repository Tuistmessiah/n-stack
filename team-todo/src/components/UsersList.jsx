import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { usersAPI } from '../services/apiService';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await usersAPI.getAll();
            setUsers(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load users',
                life: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await usersAPI.delete(userId);
            setUsers(users.filter((user) => user.id !== userId));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'User deleted successfully',
                life: 3000,
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete user',
                life: 3000,
            });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-info"
                    size="small"
                    tooltip="Edit"
                    onClick={() => {
                        toast.current?.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Edit functionality - to be implemented in workshop',
                            life: 3000,
                        });
                    }}
                />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" size="small" tooltip="Delete" onClick={() => deleteUser(rowData.id)} />
            </div>
        );
    };

    const avatarBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center">
                <img
                    src={rowData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(rowData.name || 'User')}&background=6366f1&color=fff`}
                    alt="avatar"
                    className="w-3rem h-3rem border-circle mr-3"
                />
                <span>{rowData.name}</span>
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h3 className="m-0">Team Members</h3>
            <Button
                label="Add User"
                icon="pi pi-plus"
                className="p-button-success"
                onClick={() => {
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'Add user functionality - to be implemented in workshop',
                        life: 3000,
                    });
                }}
            />
        </div>
    );

    return (
        <Card className="h-full">
            <Toast ref={toast} />
            <DataTable
                value={users}
                loading={loading}
                header={header}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                tableStyle={{ minWidth: '50rem' }}
                emptyMessage="No users found"
                className="p-datatable-sm"
            >
                <Column field="name" header="Name" body={avatarBodyTemplate} sortable style={{ width: '40%' }} />
                <Column field="email" header="Email" sortable style={{ width: '35%' }} />
                <Column field="role" header="Role" sortable style={{ width: '15%' }} />
                <Column body={actionBodyTemplate} header="Actions" style={{ width: '10%' }} />
            </DataTable>
        </Card>
    );
}
