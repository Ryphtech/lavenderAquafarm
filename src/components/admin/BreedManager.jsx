import React, { useState, useEffect } from 'react';
import { breedService } from '../../services/mockData';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const BreedManager = () => {
    const [breeds, setBreeds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBreed, setCurrentBreed] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '', description: '', quality: '',
        price_pair: '', images: '', male_avail: true, female_avail: true, status: 'available'
    });

    useEffect(() => {
        refreshBreeds();
    }, []);

    const refreshBreeds = () => {
        setBreeds(breedService.getAll());
    };

    const handleOpenModal = (breed = null) => {
        if (breed) {
            setCurrentBreed(breed);
            setFormData({
                name: breed.name,
                description: breed.description,
                quality: breed.quality,
                price_pair: breed.price_pair,
                images: breed.images[0], // Simplified for demo
                male_avail: breed.male_avail,
                female_avail: breed.female_avail,
                status: breed.status
            });
        } else {
            setCurrentBreed(null);
            setFormData({
                name: '', description: '', quality: '',
                price_pair: '', images: '', male_avail: true, female_avail: true, status: 'available'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price_pair: Number(formData.price_pair),
            images: [formData.images]
        };

        if (currentBreed) {
            breedService.update(currentBreed.id, payload);
        } else {
            breedService.add(payload);
        }

        setIsModalOpen(false);
        refreshBreeds();
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this breed?')) {
            breedService.delete(id);
            refreshBreeds();
        }
    };

    const toggleStatus = (breed) => {
        const newStatus = breed.status === 'available' ? 'unavailable' : 'available';
        breedService.update(breed.id, { status: newStatus });
        refreshBreeds();
    };

    return (
        <div className="bg-surface-dark rounded-2xl shadow-sm border border-white/5 p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Breeds</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
                >
                    <Plus size={18} /> <span>Add New Breed</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Breed</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Availability</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-white/50 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-white/5">
                        {breeds.map((breed) => (
                            <tr key={breed.id}>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    <img src={breed.images[0]} alt="" className="h-10 w-10 rounded-full mr-3 object-cover border border-white/10" />
                                    <div className="text-sm font-bold text-white">{breed.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                                    M: {breed.male_avail ? <span className="text-green-400">Yes</span> : <span className="text-red-400">No</span>},
                                    F: {breed.female_avail ? <span className="text-green-400">Yes</span> : <span className="text-red-400">No</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-accent">₹{breed.price_pair}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => toggleStatus(breed)}
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${breed.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {breed.status}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleOpenModal(breed)} className="text-indigo-600 hover:text-indigo-900"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(breed.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-surface-dark border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">{currentBreed ? 'Edit Breed' : 'Add New Breed'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-white/10 bg-black/20 p-3 rounded-xl text-white placeholder-white/50 focus:border-accent transition-all"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-white/10 bg-black/20 p-3 rounded-xl text-white placeholder-white/50 focus:border-accent transition-all resize-none"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="Quality (e.g. show grade)"
                                    value={formData.quality}
                                    onChange={e => setFormData({ ...formData, quality: e.target.value })}
                                    className="w-full border border-white/10 bg-black/20 p-3 rounded-xl text-white placeholder-white/50 focus:border-accent transition-all"
                                />
                                <input
                                    type="number"
                                    placeholder="Price per Pair"
                                    value={formData.price_pair}
                                    onChange={e => setFormData({ ...formData, price_pair: e.target.value })}
                                    className="w-full border border-white/10 bg-black/20 p-3 rounded-xl text-white placeholder-white/50 focus:border-accent transition-all"
                                    required
                                />
                            </div>
                            <input
                                placeholder="Image URL"
                                value={formData.images}
                                onChange={e => setFormData({ ...formData, images: e.target.value })}
                                className="w-full border border-white/10 bg-black/20 p-3 rounded-xl text-white placeholder-white/50 focus:border-accent transition-all"
                                required
                            />
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.male_avail}
                                        onChange={e => setFormData({ ...formData, male_avail: e.target.checked })}
                                    />
                                    <span>Male Available</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.female_avail}
                                        onChange={e => setFormData({ ...formData, female_avail: e.target.checked })}
                                    />
                                    <span>Female Available</span>
                                </label>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold">
                                Save Breed
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BreedManager;
