<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { SignInSchema } from "@schemas/signin.schema";

const { } = useForm({
  validationSchema: toTypedSchema(SignInSchema),
});
</script>

<template>
  <div>

  </div>
</template>
