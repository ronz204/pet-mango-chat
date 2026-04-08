<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { SignUpSchema } from "@schemas/signup.schema";

const { } = useForm({
  validationSchema: toTypedSchema(SignUpSchema),
});
</script>

<template>
  <div>

  </div>
</template>