import { useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Badge } from 'primereact/badge';
import UsersList from './UsersList';
import TasksList from './TasksList';

export default function TeamTodoApp() {
    const [activeView, setActiveView] = useState('both'); // 'users', 'tasks', 'both'

    const startContent = (
        <div className="flex align-items-center gap-3">
            <i className="pi pi-users text-primary text-2xl"></i>
            <div>
                <h2 className="m-0 text-primary">Team Todo Manager</h2>
                <p className="m-0 text-sm text-color-secondary">Manage your team and their tasks efficiently</p>
            </div>
        </div>
    );

    const endContent = (
        <div className="flex gap-2">
            <Button label="Users" icon="pi pi-users" className={`p-button-sm ${activeView === 'users' ? '' : 'p-button-outlined'}`} onClick={() => setActiveView('users')} />
            <Button label="Tasks" icon="pi pi-list" className={`p-button-sm ${activeView === 'tasks' ? '' : 'p-button-outlined'}`} onClick={() => setActiveView('tasks')} />
            <Button label="Both" icon="pi pi-th-large" className={`p-button-sm ${activeView === 'both' ? '' : 'p-button-outlined'}`} onClick={() => setActiveView('both')} />
        </div>
    );

    const renderContent = () => {
        switch (activeView) {
            case 'users':
                return (
                    <div className="h-full">
                        <UsersList />
                    </div>
                );
            case 'tasks':
                return (
                    <div className="h-full">
                        <TasksList />
                    </div>
                );
            case 'both':
            default:
                return (
                    <Splitter style={{ height: 'calc(100vh - 140px)' }} className="mb-5">
                        <SplitterPanel className="flex align-items-stretch" size={50} minSize={30}>
                            <div className="w-full p-3">
                                <UsersList />
                            </div>
                        </SplitterPanel>
                        <SplitterPanel className="flex align-items-stretch" size={50} minSize={30}>
                            <div className="w-full p-3">
                                <TasksList />
                            </div>
                        </SplitterPanel>
                    </Splitter>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Toolbar start={startContent} end={endContent} className="mb-4 border-noround surface-card shadow-2" />

            <div className="px-4">
                {activeView !== 'both' && (
                    <Card className="mb-4">
                        <div className="flex align-items-center justify-content-between">
                            <div className="flex align-items-center gap-3">
                                <Badge value="Workshop Exercise" severity="info" className="mr-2" />
                                <span className="text-color-secondary">This is a training project. Implement CRUD operations, add forms, and enhance the UI!</span>
                            </div>
                            <Button label="View Documentation" icon="pi pi-external-link" className="p-button-text p-button-sm" onClick={() => window.open('https://primereact.org/', '_blank')} />
                        </div>
                    </Card>
                )}

                {renderContent()}

                {activeView === 'both' && (
                    <Card className="mt-4">
                        <div className="text-center">
                            <h4 className="text-primary mb-2">🚀 Workshop Challenge</h4>
                            <p className="text-color-secondary mb-3">Ready to enhance this application? Here are some ideas to implement:</p>
                            <div className="grid">
                                <div className="col-12 md:col-6 lg:col-3">
                                    <div className="surface-card border-round p-3 h-full">
                                        <i className="pi pi-plus-circle text-green-500 text-2xl mb-2"></i>
                                        <h5>Add Forms</h5>
                                        <p className="text-sm text-color-secondary">Create dialogs to add/edit users and tasks</p>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6 lg:col-3">
                                    <div className="surface-card border-round p-3 h-full">
                                        <i className="pi pi-filter text-blue-500 text-2xl mb-2"></i>
                                        <h5>Add Filters</h5>
                                        <p className="text-sm text-color-secondary">Filter tasks by status, priority, or user</p>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6 lg:col-3">
                                    <div className="surface-card border-round p-3 h-full">
                                        <i className="pi pi-chart-bar text-orange-500 text-2xl mb-2"></i>
                                        <h5>Add Dashboard</h5>
                                        <p className="text-sm text-color-secondary">Show statistics and progress charts</p>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6 lg:col-3">
                                    <div className="surface-card border-round p-3 h-full">
                                        <i className="pi pi-mobile text-purple-500 text-2xl mb-2"></i>
                                        <h5>Responsive Design</h5>
                                        <p className="text-sm text-color-secondary">Optimize for mobile and tablet views</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
