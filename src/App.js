import React, { useState } from 'react';
import { Banknote, ArrowLeftRight, ArrowDownCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import './App.css';
import AdminHeader from './components/AdminHeader';


const mockTransactions = [
    {
        id: "T001",
        type: 'Dépôt',
        amount: 25000,
        fees: 500,
        date: '2024-03-17 14:30',
        agency: 'MTN',
        sourceType: 'Cash',
        beneficiary: 'Compte Personnel',
        status: 'Complété',
        reference: 'DEP-MTN-001'
    },
    {
        id: "T002",
        type: 'Dépôt',
        amount: 100000,
        fees: 2000,
        date: '2024-03-18 10:00',
        agency: 'Orange',
        sourceType: 'Virement',
        beneficiary: 'Compte Entreprise',
        status: 'Complété',
        reference: 'DEP-ORG-002'
    },
    {
        id: "T003",
        type: 'Dépôt',
        amount: 5000,
        fees: 100,
        date: '2024-03-19 11:15',
        agency: 'MTN',
        sourceType: 'Cash',
        beneficiary: 'Compte Personnel',
        status: 'Complété',
        reference: 'DEP-MTN-003'
    },

    // Retraits
    {
        id: "T004",
        type: 'Retrait',
        amount: 15000,
        fees: 350,
        date: '2024-03-20 16:45',
        agency: 'MTN',
        sourceType: 'Compte',
        beneficiary: 'Retrait Personnel',
        status: 'En attente',
        reference: 'RET-MTN-004'
    },
    {
        id: "T005",
        type: 'Retrait',
        amount: 20000,
        fees: 400,
        date: '2024-03-21 09:00',
        agency: 'Orange',
        sourceType: 'Compte',
        beneficiary: 'Retrait Personnel',
        status: 'Complété',
        reference: 'RET-ORG-005'
    },
    {
        id: "T006",
        type: 'Retrait',
        amount: 7500,
        fees: 150,
        date: '2024-03-22 13:30',
        agency: 'MTN',
        sourceType: 'Cash',
        beneficiary: 'Retrait Personnel',
        status: 'Échoué',
        reference: 'RET-MTN-006'
    },

    // Transferts
    {
        id: "T007",
        type: 'Transfert',
        amount: 50000,
        fees: 1000,
        date: '2024-03-23 08:20',
        agency: 'Orange',
        sourceType: 'Client',
        beneficiary: 'Ahmed Diallo',
        beneficiaryPhone: '07812345678',
        status: 'Complété',
        reference: 'TRF-ORG-007'
    },
    {
        id: "T008",
        type: 'Transfert',
        amount: 30000,
        fees: 600,
        date: '2024-03-24 14:40',
        agency: 'MTN',
        sourceType: 'Client',
        beneficiary: 'Luc Ouédraogo',
        beneficiaryPhone: '07898765432',
        status: 'En attente',
        reference: 'TRF-MTN-008'
    },
    {
        id: "T009",
        type: 'Transfert',
        amount: 120000,
        fees: 2400,
        date: '2024-03-25 11:10',
        agency: 'Orange',
        sourceType: 'Entreprise',
        beneficiary: 'Bénédicte Zongo',
        beneficiaryPhone: '07811223344',
        status: 'Complété',
        reference: 'TRF-ORG-009'
    },
    {
        id: "T010",
        type: 'Transfert',
        amount: 25000,
        fees: 500,
        date: '2024-03-26 09:30',
        agency: 'MTN',
        sourceType: 'Client',
        beneficiary: 'Fatou Diop',
        beneficiaryPhone: '07877665544',
        status: 'Échoué',
        reference: 'TRF-MTN-010'
    },

    // Transactions mixtes
    {
        id: "T011",
        type: 'Dépôt',
        amount: 40000,
        fees: 800,
        date: '2024-03-27 15:00',
        agency: 'MTN',
        sourceType: 'Virement',
        beneficiary: 'Compte Personnel',
        status: 'Complété',
        reference: 'DEP-MTN-011'
    },
    {
        id: "T012",
        type: 'Retrait',
        amount: 30000,
        fees: 600,
        date: '2024-03-28 12:30',
        agency: 'Orange',
        sourceType: 'Compte',
        beneficiary: 'Retrait Personnel',
        status: 'Complété',
        reference: 'RET-ORG-012'
    },
    {
        id: "T013",
        type: 'Transfert',
        amount: 80000,
        fees: 1600,
        date: '2024-03-29 10:50',
        agency: 'MTN',
        sourceType: 'Client',
        beneficiary: 'Jean Marc',
        beneficiaryPhone: '07834567890',
        status: 'Complété',
        reference: 'TRF-MTN-013'
    },
    {
        id: "T014",
        type: 'Dépôt',
        amount: 55000,
        fees: 1100,
        date: '2024-03-30 16:00',
        agency: 'MTN',
        sourceType: 'Virement',
        beneficiary: 'Compte Entreprise',
        status: 'Complété',
        reference: 'DEP-MTN-014'
    },
    {
        id: "T015",
        type: 'Retrait',
        amount: 120000,
        fees: 2400,
        date: '2024-03-31 14:20',
        agency: 'Orange',
        sourceType: 'Compte',
        beneficiary: 'Retrait Personnel',
        status: 'Échoué',
        reference: 'RET-ORG-015'
    }
];

const TransactionHistory = ({ transactions = mockTransactions }) => {
    const [activeCategory, setActiveCategory] = useState('Tout');

    const categories = ['Tout', 'Dépôt', 'Retrait', 'Transfert'];

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Dépôt':
                return <ArrowDownCircle className="w-5 h-5 text-green-500" />;
            case 'Retrait':
                return <Banknote className="w-5 h-5 text-red-500" />;
            case 'Transfert':
                return <ArrowLeftRight className="w-5 h-5 text-blue-500" />;
            default:
                return null;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Complété':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'En attente':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'Échoué':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Complété':
                return 'bg-green-100 text-green-800';
            case 'En attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'Échoué':
                return 'bg-red-100 text-red-800';
            default:
                return '';
        }
    };

    const getAgencyBadgeClass = (agency) => {
        return agency === 'MTN' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-orange-100 text-orange-800';
    };

    const filteredTransactions = transactions.filter(transaction => 
        activeCategory === 'Tout' || transaction.type === activeCategory
    );

    return (
        <>
            {/* Utilisation de AdminHeader comme header */}
            <AdminHeader />

            {/* Contenu des transactions */}
            <div className="w-full p-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Historique des Transactions
                        </h3>
                        
                        {/* Filtres par catégorie */}
                        <div className="flex space-x-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 
                                        ${activeCategory === category 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Montant</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Frais</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Agence</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Détails</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTransactions.map((transaction) => (
                                    <tr 
                                        key={transaction.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {getTypeIcon(transaction.type)}
                                                <span className="text-sm text-gray-900 ml-2">{transaction.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium">
                                                {new Intl.NumberFormat('fr-FR').format(transaction.amount)} XOF
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">
                                                {new Intl.NumberFormat('fr-FR').format(transaction.fees)} XOF
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">
                                                {new Date(transaction.date).toLocaleString('fr-FR')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAgencyBadgeClass(transaction.agency)}`}>
                                                {transaction.agency}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <p className="text-gray-900">{transaction.beneficiary}</p>
                                                {transaction.beneficiaryPhone && (
                                                    <p className="text-gray-500 text-xs">{transaction.beneficiaryPhone}</p>
                                                )}
                                                <p className="text-gray-500 text-xs">Réf: {transaction.reference}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(transaction.status)}`}>
                                                {getStatusIcon(transaction.status)}
                                                <span className="ml-1">{transaction.status}</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionHistory;
