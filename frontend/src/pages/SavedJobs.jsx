import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";

const savedJobs = [
  {
    id: 1,
    title: "React Developer",
    company: "Amazon",
    location: "Remote",
  },
];

export default function SavedJobs() {
  return (
    <div>
      <PageHeader
        title="Saved Jobs"
        subtitle="Jobs you saved for later."
      />

      <div className="space-y-5">
        {savedJobs.map((job) => (
          <Card key={job.id}>
            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>

                <p>{job.company}</p>

                <p>{job.location}</p>
              </div>

              <div className="flex gap-2">

                <Button variant="outline">
                  View
                </Button>

                <Button variant="danger">
                  Remove
                </Button>

              </div>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}