import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { useRef } from 'react';
import { tasksAPI } from '../services/apiService';

export default function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await tasksAPI.getAll();
            setTasks(data);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load tasks',
                life: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await tasksAPI.delete(taskId);
            setTasks(tasks.filter((task) => task.id !== taskId));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Task deleted successfully',
                life: 3000,
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete task',
                life: 3000,
            });
        }
    };

    const toggleTaskStatus = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await tasksAPI.update(task.id, updatedTask);
            setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: `Task marked as ${updatedTask.completed ? 'completed' : 'pending'}`,
                life: 3000,
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update task status',
                life: 3000,
            });
        }
    };

    const statusBodyTemplate = (rowData) => {
        const getSeverity = (completed) => {
            return completed ? 'success' : 'warning';
        };

        return <Tag value={rowData.completed ? 'Completed' : 'Pending'} severity={getSeverity(rowData.completed)} icon={rowData.completed ? 'pi pi-check' : 'pi pi-clock'} />;
    };

    const priorityBodyTemplate = (rowData) => {
        const getPrioritySeverity = (priority) => {
            switch (priority?.toLowerCase()) {
                case 'high':
                    return 'danger';
                case 'medium':
                    return 'warning';
                case 'low':
                    return 'success';
                default:
                    return 'info';
            }
        };

        return <Tag value={rowData.priority || 'Medium'} severity={getPrioritySeverity(rowData.priority)} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon={rowData.completed ? 'pi pi-undo' : 'pi pi-check'}
                    className={`p-button-rounded p-button-text ${rowData.completed ? 'p-button-warning' : 'p-button-success'}`}
                    size="small"
                    tooltip={rowData.completed ? 'Mark as Pending' : 'Mark as Completed'}
                    onClick={() => toggleTaskStatus(rowData)}
                />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" size="small" tooltip="Delete" onClick={() => deleteTask(rowData.id)} />
            </div>
        );
    };

    const descriptionBodyTemplate = (rowData) => {
        const description = rowData.description || rowData.title || 'No description';
        return (
            <div className="max-w-20rem">
                <p className="m-0 text-overflow-ellipsis overflow-hidden white-space-nowrap">{description}</p>
            </div>
        );
    };

    const dueDateBodyTemplate = (rowData) => {
        if (!rowData.dueDate) return '-';

        const date = new Date(rowData.dueDate);
        const today = new Date();
        const isOverdue = date < today && !rowData.completed;

        return <span className={isOverdue ? 'text-red-500 font-bold' : ''}>{date.toLocaleDateString()}</span>;
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h3 className="m-0">Tasks</h3>
            <Button
                label="Add Task"
                icon="pi pi-plus"
                className="p-button-success"
                onClick={() => {
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'Add task functionality - to be implemented in workshop',
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
                value={tasks}
                loading={loading}
                header={header}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                tableStyle={{ minWidth: '50rem' }}
                emptyMessage="No tasks found"
                className="p-datatable-sm"
                sortField="completed"
                sortOrder={1}
            >
                <Column field="title" header="Task" body={descriptionBodyTemplate} sortable style={{ width: '30%' }} />
                <Column field="completed" header="Status" body={statusBodyTemplate} sortable style={{ width: '15%' }} />
                <Column field="priority" header="Priority" body={priorityBodyTemplate} sortable style={{ width: '15%' }} />
                <Column field="dueDate" header="Due Date" body={dueDateBodyTemplate} sortable style={{ width: '15%' }} />
                <Column field="assignedTo" header="Assigned To" sortable style={{ width: '15%' }} />
                <Column body={actionBodyTemplate} header="Actions" style={{ width: '10%' }} />
            </DataTable>
        </Card>
    );
}
