import { useState } from "react";
import { Add, CheckCircle, Sync, WarningAmber } from "@mui/icons-material";
import ercicon from "../../assets/erc-icon.png";
import CentersTable from "../../components/centers/CentersTable";
import PageContainer from "../../components/layout/PageContainer";
import PageTitle from "../../components/layout/PageTitle";
import EntityFormModal, {
    type FormField,
} from "../../components/modals/EntityFormModal";
import StatCard from "../../components/ui/StatCard";
import { useCenters } from "../../hooks/useCenters";
import type { Center } from "../../types/center";

export default function CentersPage() {
    const { centers, loading, error, currentPage, lastPage, setCurrentPage, createCenter } =
        useCenters();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalCenters = centers.length;
    const activeCenters = centers.filter((center) => center.is_active).length;
    const inactiveCenters = centers.filter(
        (center) => !center.is_active,
    ).length;

    const centerFields: FormField[] = [
        {
            name: "name",
            label: "Center Name",
            type: "text",
            placeholder: "Enter center name",
            required: true,
        },
        {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "Enter center address",
            required: true,
        },
        {
            name: "phone",
            label: "Phone",
            type: "tel",
            placeholder: "Enter center phone number",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter center email",
            required: true,
        },
        {
            name: "is_active",
            label: "Active Center",
            type: "checkbox",
            defaultValue: true,
        },
    ];

    const handleCreateCenter = async (data: Center) => {
        try {
            setIsSubmitting(true);

            const { message } = await createCenter({
                name: data.name,
                address: data.address,
                phone: data.phone,
                email: data.email,
                is_active: Boolean(data.is_active),
            });

            console.log(message);

            setIsCreateOpen(false);
        } catch (err) {
            console.error("Failed to create center: ", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageContainer>
            <PageTitle
                breadcrumb="ERC / Super Admin / Centers"
                title="Centers Overview"
                description="Manage and monitor all ERC centers."
                action={
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
                    >
                        <Add />
                        Add Center
                    </button>
                }
            />

            <div className="flex gap-6 mb-8">
                <StatCard
                    icon={
                        <img
                            src={ercicon}
                            alt="erc-icon"
                            className="h-10 w-10 object-contain"
                        />
                    }
                    value={totalCenters}
                    label="Total Centers"
                    colorClass="bg-red-50"
                />
                <StatCard
                    icon={<CheckCircle className="text-emerald-500" />}
                    value={activeCenters}
                    label="Active"
                    colorClass="bg-emerald-50"
                />
                <StatCard
                    icon={<WarningAmber className="text-amber-500" />}
                    value={inactiveCenters}
                    label="Inactive"
                    colorClass="bg-amber-50"
                />
                <StatCard
                    icon={<Sync className="text-sky-500" />}
                    value="Now"
                    label="Last Sync"
                    colorClass="bg-sky-50"
                />
            </div>

            <CentersTable
                centers={centers}
                loading={loading}
                error={error}
                currentPage={currentPage}
                lastPage={lastPage}
                onPrevious={() => setCurrentPage((prev) => prev - 1)}
                onNext={() => setCurrentPage((prev) => prev + 1)}
            />

            <EntityFormModal
                isOpen={isCreateOpen}
                title="Create Center"
                fields={centerFields}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={(data) => handleCreateCenter(data as Center)}
                submitText="Create Center"
                isSubmitting={isSubmitting}
            />
        </PageContainer>
    );
}
