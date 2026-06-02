"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";

export default function JoinDesigner() {
  return (
    <form>
      <Field className="space-y-2">
        <FieldGroup>
          <FieldLabel>Full Name</FieldLabel>
          <Input placeholder="Enter your full name" />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Email Address</FieldLabel>
          <Input placeholder="your@email.com" />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Years of Experience</FieldLabel>
          <Input placeholder="Enter your years of experience" type="number" />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Specializations</FieldLabel>
          <Input placeholder="e.g., Implants, Crown & Bridge..." />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Portfolio Link (Optional)</FieldLabel>
          <Input placeholder="https://your-portfolio.com" />
        </FieldGroup>

        <Button className="h-10 mt-2">Submit Application</Button>
      </Field>
    </form>
  );
}
