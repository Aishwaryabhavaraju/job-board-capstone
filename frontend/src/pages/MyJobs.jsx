import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Hyderabad",
    applicants: 18,
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "TechNova",
    location: "Remote",
    applicants: 9,
  },
];

export default function MyJobs() {
  return (
    <div>

      <PageHeader
        title="My Jobs"
        subtitle="Manage your posted jobs."
      />

      <div className="space-y-5">

        {jobs.map((job) => (

          <Card key={job.id}>

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  {job.title}
                </h2>

                <p className="text-gray-500">
                  {job.company}
                </p>

                <p className="text-gray-500">
                  {job.location}
                </p>

              </div>

              <div className="text-right">

                <Badge color="green">
                  {job.applicants} Applicants
                </Badge>

                <div className="flex gap-2 mt-4">

                  <Button variant="outline">
                    Edit
                  </Button>

                  <Button variant="danger">
                    Delete
                  </Button>

                </div>

              </div>

            </div>

          </Card>

        ))}

      </div>

    </div>
  );
}