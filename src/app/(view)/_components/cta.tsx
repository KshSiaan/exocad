import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FindDesigner from "./find-designer";
import JoinDesigner from "./join-designer";

export function CTA() {
  return (
    <section
      className="relative  overflow-hidden"
      style={{
        backgroundImage: `url('/img/cta.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 px-6 lg:px-10 bg-linear-to-r from-black/80 to-black/5 h-full py-20 lg:py-28">
        <div className="max-w-xl">
          <h2 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
            Ready To Transform Your
            <br />
            Dental CAD Workflow?
          </h2>
          <p className="text-white/50 mt-4 text-[13.5px] leading-relaxed">
            See how ExoConnect is helping dental professionals collaborate
            faster, deliver better results, and grow their workflow with
            confidence.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full">Find a Designer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl">
                    Connect with a designer
                  </DialogTitle>
                  <DialogDescription>
                    Connect with elite exocad designers for your dental practice
                  </DialogDescription>
                </DialogHeader>
                <div className="">
                  <FindDesigner />
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  Join as a Designer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl">
                    Join as a Designer
                  </DialogTitle>
                  <DialogDescription>
                    Become part of our elite exocad designer network
                  </DialogDescription>
                </DialogHeader>
                <div className="">
                  <JoinDesigner />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
