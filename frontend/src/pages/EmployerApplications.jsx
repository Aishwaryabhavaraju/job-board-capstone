import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import PageHeader from "../components/ui/PageHeader";

const applications = [
  {
    id: 1,
    applicant: "John Doe",
    job: "Frontend Developer",
    date: "2026-06-28",
    status: "Pending",
  },
  {
    id: 2,
    applicant: "Jane Smith",
    job: "Backend Developer",
    date: "2026-06-27",
    status: "Shortlisted",
  },
];

export default function EmployerApplications() {
  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Manage job applications."
      />

      <div className="space-y-5">
        {applications.map((application) => (
          <Card key={application.id}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

              <div>
                <h2 className="text-xl font-semibold">
                  {application.applicant}
                </h2>

                <p className="text-gray-500">
                  Applied for: {application.job}
                </p>

                <p className="text-gray-500">
                  Date: {application.date}
                </p>

                <Badge
                  color={
                    application.status === "Shortlisted"
                      ? "green"
                      : "yellow"
                  }
                >
                  {application.status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  Resume
                </Button>

                <Button variant="success">
                  Shortlist
                </Button>

                <Button variant="danger">
                  Reject
                </Button>
              </div>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}