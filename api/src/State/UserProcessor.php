<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserProcessor implements ProcessorInterface
{
    private ProcessorInterface $decorated;
    private UserPasswordHasherInterface $userPasswordHasher;

    public function __construct(ProcessorInterface $decorated, UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->decorated = $decorated;
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($data->getPassword()) {
            $data->setPassword(
                $this->userPasswordHasher->hashPassword($data, $data->getPassword())
            );
            $data->eraseCredentials();
        }
        $result = $this->decorated->process($data, $operation, $uriVariables, $context);

        return $result;
    }
}
