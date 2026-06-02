"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";

export default function FindDesigner() {
  return (
    <form>
      <Field className="space-y-2">
        <FieldGroup>
          <FieldLabel>Practice Name</FieldLabel>
          <Input placeholder="Enter your practice name" />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Email Address</FieldLabel>
          <Input placeholder="your@email.com" />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Project Type</FieldLabel>
          <Input placeholder="Enter your project type" />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Additional Details</FieldLabel>
          <Textarea
            placeholder="Enter additional details about your project"
            className="min-h-25"
          />
        </FieldGroup>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <Button>Submit Request</Button>
          <Button
            className="bg-[#E07A5F] hover:bg-[#D16A4F]"
            type="button"
            asChild
          >
            <Link href="/designers">Browse Designers</Link>
          </Button>
        </div>
      </Field>
    </form>
  );
}
